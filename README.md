# This project was built using two technologies:
    * React (Front-End)
    * Django (Bank-End)

# Features of the Student Portal:
* The student should have a Dashboard 
* The student should be able to do the Registration: 
    *  On the registration pages of students, it should show courses that are to be registered only by the students for that semester. Core courses, GST, electives and outstanding
    * Using this illustration, 
        * A 400L computer student registering for the first semester should not see lower-level courses that he/she has passed. He/she should only see the following:
            * 400L core courses for the first semester 
            * Outstanding GST courses for the first semester 
            * 400L Electives for the first semester (if any) 
            * Lower level cores courses that he/she hasn't passed
* The student should be able to view the Result 
* The student should be able to view Approved course registration 
* The student should be able to view unapproved registered courses
* The student should be able to edit unapproved registered courses

# Steps:
Clone the github repository using the command below:

`git clone https://github.com/Celnet-hub/Student-Portal.git` 

Change directory

`cd Student-Portal`


# Getting Started with Create React App (Project FrontEnd)

Before starting make sure [Node](https://nodejs.org/en/download/) is installed in your local device.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Getting started with the Djanjo application (Project Backend)

Before starting make sure that [python](https://www.python.org/downloads/) is installed in your local device.

Create and activate a virtual environment for the application:

`python3 -m venv ~/.backend`

`source venv/bin/activate`

Install dependencies 

`pip install -r requirements.txt`

Create a superuser for the admin. This user will be used to login to the admin portion of the application.

`python manage.py createsuperuser` and follow the prompt.

`python manage.py makemigrations`

`python manage.py migrate`

`python manage.py runserver`

The last command will start the python server on port 8000 on localhost
`http://localhost:8000`


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## More about [Django](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Introduction)