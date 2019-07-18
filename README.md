# Dyno Express *(Still under development :))*

## Introduction

> This repository contains extended Express JS framework for enhancing the reusability and flexibility of native Express JS boilerplate.

## Installation

Initially clone the project from this repository.
```sh
$ git@github.com:hasithaishere/Dyno-Express.git
```

Please refer following steps to run the project in local or development environment.
First clone the project form this repository then run following commands.
```sh
$ npm install
$ node start
```
Then application will successfully run on your local environment. [http://localhost:3000](http://localhost:3000)

## Code/Folder Structure
This application contains following code/folder structure.
* `controllers/` – defines API routes' logic
* `config/` – contains all the config files
* `log/` – contains all application's log files
* `public/` – contains all static files like images, styles and javascript
* `schemas/` – provide validation rules for each API request
* `views/` – provides templates which are rendered and served by your routes
* `routes/` – contains the express router specific to the each end-point(Grouped based on the bushiness purpose)
* `tests/` – contain test classes and test-helper classes
* `tests/integration` – provide the integration/functional tests for each end point
* `tests/integration/data` – provide test data which required for executing integration/functional test cases
* `tests/lib/helpers` – helper classes for supporting test classes
* `app.js` – initializes the app and glues everything together
* `package.json` – remembers all packages that your app depends on and their versions


#### Spin–up Mongo instance (*For Development Purpose*)

Use Docker to run Mongo instance in local development environment. Please install [Docker](https://docs.docker.com/engine/installation/) first, then run following command.
```sh
$ docker run --name docker-mongo -p 27017:27017 -v /< Local Path >/mount-folder:/etc/mongo mongo
```


