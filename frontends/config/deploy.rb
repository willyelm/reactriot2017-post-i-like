require 'mina/rails'
require 'mina/git'
require 'mina/multistage'

set :current_path, fetch(:deploy_to) + '/frontends/current'
set :shared_path, fetch(:deploy_to) + '/frontends/shared'
set :releases_path, fetch(:deploy_to) + '/frontends/releases'
# set :shared_paths, []
set :app_path, fetch(:current_path)
set :default_stage, 'staging'
set :repository, 'https://github.com/Hackbit/reactriot2017-post-i-like.git'

task :environment do
end

task setup: :environment do
end

desc "Move folder frontends to root of build folder"
task :move_to_parent do
  command %{
    cd #{fetch(:deploy_to)}/tmp/
    cd `ls -td -- */ | head -n 1`
    mv frontends/* ./
    rm -rf backends
    rm -rf frontends
  }
end

desc 'Deploys the current version to the server.'
task deploy: :environment do
  deploy do
    invoke :'git:clone'
    invoke :'move_to_parent'
    invoke :'deploy:cleanup'
    invoke :'wp_build:build_and_zip'

    on :launch do

      command 'ln -nfs $release_path/../../shared/.rbenv-vars \
               $release_path/.rbenv-vars'
      stage = fetch(:stage) == 'staging' ? 'staging' : 'production'
      command "mv #{fetch(:deploy_to)}/frontends/build.tar $release_path/"
      command "cd $release_path && rm -rf build && \
        tar -xvf build.tar && \
        rm -rf build.tar rm -rf #{fetch(:deploy_to)}/frontends/build.tar"
      system 'rm -rf build.tar && rm -rf build'
    end
  end
end

namespace :wp_build do
  env = fetch(:stage) == 'staging' ? 'staging' : 'build'

  set :build_and_tar,
      [
        "npm run build",
        'tar -cvf build.tar build'
      ].join(' && ')

  desc 'Build and zip'
  task build_and_zip: :environment do
    system fetch(:build_and_tar)
    system "scp build.tar\
      #{fetch(:user)}@#{fetch(:domain)}:#{fetch(:deploy_to)}/frontends"
    command 'echo "-----> Build and Zip"'
  end
end
