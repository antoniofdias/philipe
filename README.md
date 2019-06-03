# _philipe_

Online judge for Prolog and Racket programming languages.

## Getting started 

Follow these instructions in order to host program locally.

### Prerequisites

* [SWI-Prolog](http://www.swi-prolog.org)
* [Racket](https://racket-lang.org/)
* [Mongodb](https://www.mongodb.com/)
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)

### Installing (Linux x64)

* Prerequisites

```
sudo apt-add-repository ppa:swi-prolog/stable
sudo add-apt-repository ppa:plt/racket

sudo apt-get update

sudo apt-get install -y swi-prolog
sudo apt-get install -y racket

sudo apt-get install -y mongodb

sudo apt-get install -y nodejs
sudo apt-get install -y npm
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


* Dotenv
  
  * Edit .env.example
  * Rename to .env

  ```
  mv .env.example .env
  ```

### Running

```
# Developing
npm run dev 

# Or

# Release
npm run rel 
```

## Built with

See package.json for list of node modules used.

## Authors

* **Antônio F. Dias**
* **Eduardo R. Seifert**
* **Lucas Natanael Prates**
* **Pedro Pontes**

See [contributors](https://github.com/antoniofdias/sis_plp/contributors) for more information.
