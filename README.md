# SIS_PLP

Online judge for Prolog and Racket programming languages.

## Getting started 

Follow these instructions in order to host program locally.

### Prerequisites

* [SWI-Prolog](http://www.swi-prolog.org)
* [Racket](https://racket-lang.org/)
* [Mongodb](https://www.mongodb.com/)
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [nodemon](https://nodemon.io/)

### Installing (Linux x64)

* Prerequisites

```
sudo apt-add-repository ppa:swi-prolog/stable
sudo add-apt-repository ppa:plt/racket

sudo apt-get update

sudo apt-get install swi-prolog
sudo apt-get install racket

sudo apt-get install mongodb

sudo apt-get install nodejs
sudo apt-get install npm

sudo npm install nodemon -g
```

* Npm Modules

```
npm install
```

* MongoDB

  * Open mongodb via terminal

  ```
  mongo
  ```

  * Create new database and user

  ```
  use "db_name"

  db.createUser({
       user: "user",
       pwd: "password",
       roles: [ "readWrite", "dbAdmin" ]
     })
  ```


* Configuration files
  
  * Create folder and files

  ```
  mkdir config

  cd config

  touch config.js
  ```

  * Configure config.js
  
    * Generate new secret

    * Add developing (dev) database URI

  ```
  // config.js

  const env = process.env.NODE_ENV;

  const config = {};

  config.common = {
      session: {
          secret: 'secret'
      }
  };

  config.dev = {
      db: {
          uri: 'mongodb://username:password@localhost:27017/db_name'
      }
  };

  config.rel = {
      db: {
          uri: ''
      }
  };

  module.exports = {...config.common, ...config[env]};
  ```

### Running

```
npm run dev

or

PORT=3000 node app.js
```

## Built with

See package.json for list of node modules used.

## Authors

* **Antônio F. Dias**
* **Eduardo R. Seifert**
* **Lucas Natanael Prates**
* **Pedro Pontes**

See [contributors](https://github.com/antoniofdias/sis_plp/contributors) for more information.