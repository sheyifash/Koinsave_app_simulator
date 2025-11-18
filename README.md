Koinsave App Authentication & Transaction Simulator

Kindly Click Link for Postman Documentation:
https://documenter.getpostman.com/view/44530758/2sB3Wwrxfr

Overview
This project simulates the core backend processes of the Koinsave financial application, including:
User authentication (signup, login)
Email verification using OTP
JWT-based authorization
Automatic account number generation
Secure money transfer between users
It mimics real banking logic such as identity verification, wallet/account creation, secure access control, and fund transactions.


Features
🔐 Authentication & Verification
User registration with fully hashed passwords
Email verification using OTP sent to the user’s email
JWT authentication for protected routes
Token verification middleware

Account Management
Automatic generation of unique account numbers after OTP verification
User balance initialization


💸 Transaction Processing
Transfer money from one account to another
Validation of sender and receiver accounts
Sufficient balance check
Protected transaction route via JWT

Complete transaction log including:
Unique transaction ID (TFX-${Date.now()})
Sender account number
Receiver account number
Amount
Timestamp
Transaction status (success / failed)

Tech Stack
Backend: Node.js, Express
Database: MongoDB, Mongoose
Authentication: JSON Web Token (JWT)
Security: bcrypt for password hashing
Email Service: Nodemailer
Environment Management: dotenv
Development Tools: nodemon


Installation
git clone https://github.com/sheyifash/Koinsave_app_simulator.git
cd Koinsave_simulation
npm install


Environment Variables
Create a .env file with the following variables:
PORT=
DATABASE_URL=
ACCESS_TOKEN=
EMAIL=
PWORD=
MONGODB_URL=

Running the Project
npm run dev

Project Structure
project
 ┣ src
 │  ┣ controllers
 │  ┣ middleware
 │  ┣ models
 │  ┣ routers
 ┣ utils
 ┗ app.js


API Endpoints
Authentication
Method	Endpoint	        Description
POST	/api/signUp	        Register new user
POST	/api/login	        Login user
POST	/api/verifyOtp	    Verify OTP and generate account number
POST	/api/authorization	Verify JWT token

Transactions
Method	Endpoint	        Description
POST	/api/transaction	Send money (protected route)