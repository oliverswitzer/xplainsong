require 'rails_helper'

RSpec.feature 'song creation', type: :feature do
  scenario 'user can upload a song', :js => true do
    visit root_path

    expect(page).to have_text('Foobar')
    click_button 'Create new song'

    fill_in 'Title', with: 'My new song'

    click_button 'Save'

    expect(page).to have_selector '[data-test="title"]', text: 'My new song'
  end
end
