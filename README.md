# apartment-facility-booking

Web app made using MERN stack.

App deployed at [yash-appt-booking.herokuapp.com](https://yash-appt-booking.herokuapp.com/)
Instructions to use app are given there.

## About

### Backend

The backend is made using nodejs and express framework.
It is connected to a MongoDB database hosted at [MongoDB atlas](https://www.mongodb.com/cloud/atlas).
Mongoose ORM is used for handling the database management.

JWT is used for session authentication. Users get a JWT signed cookie when they log in which expires after 12 hours.
If a user explicitly logs out, the cookie is deleted from user session.

### Frontend

The frontend uses React framework.
Hooks and Context are used for state-management.
HOCs are used to protect routes.


## Using

If you want to demo this app locally, clone this repository and perform the following steps:

1. **Installing dependencies**
	
	Go to the root folder and run
	`npm install`

	Then go inside 'client' folder and run
	`npm  install`

2. **Setting environment variables**

	The application depends on environment variables to work.
	To create those environment variables, create a new file in root directory and name it `.env`
	Inside this file, create the environment variables:

  ```
  MONGO_URI = <mongodb connection uri>
  PORT = 5000
  JWT_SECRET = <secret key for jwt signing>
  ```

    
	
	
3. **Running**
	
	Inside the root folder, start the backend server by running the command:
		
	`npm run start`

	Then run the same command inside the client folder as well.

	Access the application by going to `localhost:3000`	 in web browser


