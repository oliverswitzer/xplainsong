# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

desc 'Start the server and front end webpack dev server'
task :start do
  sh 'bundle exec foreman start -f Procfile.dev'
end