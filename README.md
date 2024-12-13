# Web Project - AirBnB clone
## Description
This Project currently contains the frontend for homepage only.

## Setup Instructions
This project is built using ReactJS with vite. To run this project, follow the steps below:
1. Clone the repository
2. Run `npm install` to install all dependencies in the root folder for frontend and in `server/` folder for backend.
3. Run `npm run dev` to start the frontend.
4. Run npm start in `server/` folder to run the server.

## Key Functionalities
1. ### Login / Signup
   Users can create new accounts and Login. 
2. ### Homepage
   Users can view the listings posted by different users. They can only book or post their own listings if they are signed in.
3. ### Create Listings
   Users can publish their own listings by clicking on AirBnB your home button and filling out the form where they provide all the information about their property. It will become public when the admin approves the listing.
4. ### User Profile
   Users can see their profile by clicking the dropdown menu. From there they can also see the listings they have made and any bookings they have received on their listing and the approval status of their listings. They can also delete their listing, cancel or confirm bookings on their listings.

   Users can also see their bookings which they have made on other listings. They can cancel any pending booking, if its not confirmed yet.

5. ### Available dates 
   User can only book a listing on the dates specified by the host. These dates automatically update if a new booking is made on that listing or some old booking is cancelled on that listing. This information is filled by the user while posting the listing.
6. ### Admin Panel
   Mini admin panel which can be accessed using /admin/dashboard route. It will take you to admin login if you are not signed in with admin credentials.

   username: admin

   password: admin

   Via admin panel you can see all the listings posted by different users. See all their details. We can also approve / disapprove any listing and Delete the listing.
