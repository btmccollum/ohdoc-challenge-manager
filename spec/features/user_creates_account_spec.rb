require 'rails_helper'

feature "Account creation" do
  scenario "they visit the main page to create an account", js: true do
    email = "test01@test.com"
    password = "123456"
    password_confirmation = "123456"

    visit root_path
    expect(page).to have_content("ohdoc!")
    click_on('Sign Up')
    fill_in "email", with: email
    fill_in "password", with: password
    fill_in "password_confirmation", with: password_confirmation
    click_link_or_button 'Submit'

    expect(page).to have_content("Welcome to the OHDOC Challenge Manager!")
    expect(page).to have_content("No Account Linked.")
  end

  after do  
    Capybara.current_session.driver.quit  
  end
end