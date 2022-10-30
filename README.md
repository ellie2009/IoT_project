# IoT_project

To start using this project
- clone the repo
- run npm init
- run npm install
- create an .env file in the main folder. It should contain:
PARTICLE_EMAIL = "your-email"
PARTICLE_PASSWORD = "your-password"
PARTICLE_DEVICE_ID = "your-device-id"
DB_HOST=localhost
DB_USER="your db user"
DB_PASS="your db password"
DB_NAME=IoT_bin_project

Set up your mysql database:
- log into your local mysql instance
- create a database called "IoT_bin_project"

Start your backend server and check that it works:
- inside the main folder run node app.js
- populate the database by going to http://localhost:5000/bins/populateDatabase
- http://localhost:5000/bins/checkBinStatus

to start working on the frontend:
in the main directory, run npx create-react-app client - this will create a basic React frontend
cd into the client folder and run npm start
if not opened automatically, go to http://localhost:3000/