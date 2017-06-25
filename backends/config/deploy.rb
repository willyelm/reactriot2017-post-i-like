require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rbenv'
require 'mina/multistage'

set :app_path, fetch(:current_path)
set :repository, 'https://github.com/Hackbit/reactriot2017-post-i-like.git'

set :shared_files, [
  'config/database.yml',
  'config/secrets.yml',
  'config/config.yml',
  '.rbenv-vars'
]

set :shared_dirs, fetch(:shared_dirs, []).push('log', 'public/system', 'tmp')
set :stages, ['staging', 'production']
set :default_stage, 'staging'

task :environment do
  invoke :'rbenv:load'
end

task :setup => :environment do
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    fetch(:rails_env)
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'
    invoke :'rails:assets_precompile'
    invoke :'deploy:cleanup'

    on :launch do
      invoke :'sidekiq:restart'
      invoke :'unicorn:restart'
    end
  end
end

namespace :sidekiq do

  set :sidekiq_id, "#{fetch(:app_path)}/tmp/pids/sidekiq.pid"
  set :sidekiq_log, "#{fetch(:app_path)}/log/sidekiq.log"
  set :start_sidekiq, %{
    cd #{fetch(:app_path)} && \
    bin/sidekiq -C config/sidekiq.yml -e #{fetch(:rails_env)} -d
  }

  desc "Start sidekiq"
  task :start => :environment do
    command 'echo "-----> Start Sidekiq"'
    command fetch(:start_sidekiq)
  end

  desc "Stop sidekiq"
  task :stop do
    command 'echo "-----> Stop Sidekiq"'
    command %{
      test -s "#{fetch(:sidekiq_id)}" && kill -9 `cat "#{fetch(:sidekiq_id)}"`
          echo "Stop Ok" && exit 0
          echo >&2 "Not running"
    }
  end

  desc "Restart sidekiq"
  task :restart => :environment do
    command 'echo "-----> Stop Sidekiq"'
    command %{
      test -s "#{fetch(:sidekiq_id)}" && kill -QUIT `cat "#{fetch(:sidekiq_id)}"`
          #{fetch(:start_sidekiq)}
          echo "Restart Ok"
    }
  end
end

namespace :unicorn do

  set :unicorn_pid, "#{fetch(:app_path)}/tmp/pids/post_i_like.pid"
  set :start_unicorn, %{
    cd #{fetch(:app_path)}
    bin/unicorn -c #{fetch(:app_path)}/config/unicorn.rb -E #{fetch(:rails_env)} -D
  }

  desc "Start unicorn"
  task :start => :environment do
    command 'echo "-----> Start Unicorn"'
    puts fetch(:rails_env)
    command fetch(:start_unicorn)
  end

  desc 'Stop unicorn'
  task :stop do
    unicorn_pid = fetch(:unicorn_pid)
    command 'echo "-----> Stop Unicorn"'
    command %{
      test -s "#{unicorn_pid}" && kill -QUIT `cat "#{unicorn_pid}"`
        echo "Stop Ok" && exit 0
        echo >&2 "Not running"
    }
  end

  desc 'Restart unicorn using \'upgrade\''
  task :restart => :environment do
    unicorn_pid = fetch(:unicorn_pid)
    command 'echo "-----> Stop Unicorn"'

    command %{
      test -s "#{unicorn_pid}" && kill -s USR2 `cat "#{unicorn_pid}"` && \
        echo "Restart Ok" && exit
        #{fetch(:start_unicorn)}
    }
  end
end
