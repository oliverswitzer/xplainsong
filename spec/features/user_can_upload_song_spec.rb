require 'rails_helper'

RSpec.feature 'song creation', type: :feature do
  scenario 'user can upload a song', :js => true do
    visit '/songs'

    expect(page).to have_text('Songs')

    click_button 'Create new song'

    fill_in 'Title', with: 'My new song'
    attach_file 'stems', [file_fixture('test.mp3'), file_fixture('test2.mp3')]

    click_button 'Save'

    expect(page).to have_selector '[data-test="title"]', text: 'My new song'
    expect(page).to have_selector '[data-test="stem-count"]', text: '2'
  end
end
