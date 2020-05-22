# Xplainsong

This app is meant to help musicians explain their songs to each other! 

It makes use of the [waveform-playlist](https://github.com/naomiaro/waveform-playlist) npm library to display a lightweight DAW in the browser.

# Development 

1. Run `bin/setup` to prepare your local machine.
2. Then run `bundle exec rake start` to start both the server and webpack dev server. The server will run on port 5000.

Or, you can manually run both in separate terminals 

* Server: `bundle exec rails s` (will run on port 3000)
* Frontend: `bin/webpack-dev-server`

# Running tests

`bundle exec rspec` to run all tests