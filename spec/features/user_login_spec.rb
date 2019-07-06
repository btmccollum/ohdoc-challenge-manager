# require 'rails_helper'

# feature "Account login" do

#   before do
#     User.create(:email => 'testaccount01@test.com', :password => '123456', :password_confirmation => '123456')
#   end

#   scenario "they visit the main page to create an account", js: true do
#     email = "testaccount01@test.com"
#     password = "123456"

#     visit root_path
#     expect(page).to have_content("ohdoc!")
#     click_on('Log In')
#     fill_in "email", with: email
#     fill_in "password", with: password
#     click_link_or_button 'Submit'

#     expect(page).to have_content("Welcome to the OHDOC Challenge Manager!")
#     expect(page).to have_content("No Account Linked.")
#   end

#   after do  
#     Capybara.current_session.driver.quit  
#   end
# end