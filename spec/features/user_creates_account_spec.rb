require 'rails_helper'

feature "User creates an account" do
    scenario "they visit the main page to create an account", js: true do
        email = "test01@test.com"
        password = "123456"
        password_confirmation = "123456"

        visit root_path
        # expect(page).to have_content("ohdoc!")
        click_on('Sign Up')
        fill_in "email", with: email
        fill_in "password", with: password
        fill_in "password_confirmation", with: password_confirmation
        click_link_or_button 'Submit'

        expect(page).to have_content("Send your Tweet")
    end
end