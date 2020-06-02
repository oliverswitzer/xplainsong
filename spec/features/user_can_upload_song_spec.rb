require 'rails_helper'

RSpec.feature 'song creation', type: :feature do
  scenario 'user can upload a song', :js => true do
    visit '/songs'

    expect(page).to have_text('Songs')

    click_button 'Create new song'

    fill_in 'Title', with: 'My new song'
    attach_file 'tracks', [file_fixture('test.mp3'), file_fixture('test2.mp3')]

    click_button 'Save'

    expect(page).to have_selector '[data-test="title"]', text: 'My new song'
    expect(page).to have_selector '[data-test="track-count"]', text: '2'

    click_on 'My new song'

    expect(page.all('[data-test="track"]').size).to eq(2)
  end
end
