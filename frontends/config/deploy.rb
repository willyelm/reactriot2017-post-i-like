require 'mina/rails'
require 'mina/git'
require 'mina/multistage'

set :shared_paths, []
set :app_path, fetch(:current_path)
set :default_stage, 'staging'
set :repository, 'https://github.com/Hackbit/reactriot2017-post-i-like.git'

task :environment do
end

task setup: :environment do
end

desc 'Deploys the current version to the server.'
task deploy: :environment do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:cleanup'
    invoke :'wp_build:build_and_zip'

    on :launch do

      command 'ln -nfs $release_path/../../shared/.rbenv-vars \
               $release_path/.rbenv-vars'
      stage = fetch(:stage) == 'staging' ? 'staging' : 'production'
      command "mv #{fetch(:deploy_to)}/dist.tar $release_path/"
      command "cd $release_path && rm -rf dist && \
        tar -xvf dist.tar && \
        rm -rf dist.tar rm -rf #{fetch(:deploy_to)}/dist.tar"
      system 'rm -rf dist.tar && rm -rf dist'
    end
  end
end

namespace :wp_build do
  env = fetch(:stage) == 'staging' ? 'staging' : 'dist'

  set :build_and_tar,
      [
        "npm run #{env}",
        'tar -cvf dist.tar dist'
      ].join(' && ')

  desc 'Build and zip'
  task build_and_zip: :environment do
    system fetch(:build_and_tar)
    system "scp dist.tar\
      #{fetch(:user)}@#{fetch(:domain)}:#{fetch(:deploy_to)}/"
    command 'echo "-----> Build and Zip"'
  end
end
