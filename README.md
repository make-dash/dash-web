# The make-dash web app
This is the backend/frontend of the entire make-dash web app.

## What is make-dash?
Make dash is a progress tracker for make school teachers. It aims to allow teachers
to keep track of the work students are doing in the classroom and how well they're 
doing it.

## How to run
```
git clone https://github.com/make-dash/dash-web.git
cd dash-web
npm install
node bin/www
```

## Key dependencies
* mongod / mongoose - Used for storing and manipulating all data 
* express - Web server
* handlebars - templating engine for creating the view
