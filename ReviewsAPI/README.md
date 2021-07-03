# Project Atlelier - Reviews

### A RESTful API

This project is about designing and implementing a RESTful API for one service on a retail web portal. Data must undergo the ETL process and all the necessary endpoints created. The goal is to design a system that is optimized and capable of horizontal scaling when necessary.

---

#### Table of contents

- [Project Atlelier - Reviews](#project-atlelier---reviews)
    - [A RESTful API](#a-restful-api)
      - [Table of contents](#table-of-contents)
      - [Description](#description)
      - [Environment Setup](#environment-setup)
      - [Data](#data)
        - [Database](#database)
        - [ETL](#etl)

---

#### Description

This project is my first attempt at designing a backend system to manage large scale data storage as well as web scale traffic. The challenge is to design and implement a more optimal architecture to seamlessly replace a currently deployed system. This necessarily places some constraints on the design because it must integrate with the frontend without demanding any alteration to it. The number and type of endpoints, as well as the shape of the data for each response must map directly to the currently implemented system.

---

#### Environment Setup

If you wish to utilize this application, ensure the following software is installed on your system:

- [Node.js](https://nodejs.org/) v14.16.1 or later
- [PostgreSQL](https://www.postgresql.org/) v13.3 or later

Fork and clone a copy of this repository to your machine and then navigate your terminal into the repo. Run `npm install` to install all the necessary [dependencies](../package.json).

Using the `psql` CLI or a GUI such as PGAdmin, create a new PostgreSQL database and ensure your user has been granted the `pg_read_server_files` privilege.

A config.js file in the project root directory is required that contains the database configuration details in the following format:

```node
module.exports.postgresConfig = {
  user: 'username',
  host: 'hostAddress', // Use 'localhost' if db and server are on the same machine
  database: 'database',
  password: 'password',
  port: 5432, // This is the Postgres default port
};
```

---

#### Data

The data was received in four .csv files, each containing the rows extracted from one table. Combined, the files contained just over 31 million records. I've included a representative [sample](./SampleData/) of each file for reference.

##### Database

The [schema](Postgres/schema.sql) for each table is designed around the shape of the incoming data and the requisite responses. Consideration is also paid to the maintainability of the records into the future by not using any nested data structures.

Postgres conveniently provides the ability to run a .sql file directly from your terminal as well as from the `psql` CLI. In the terminal simply run:

```bash
psql <username> -h <hostAddress> -d <database> -f <full path to file>
```

or in the `psql` CLI, `\c` into the desired database and run:

```bash
\i <full path to file>
```

Using one of these methods to run the schema.sql file will easily create all of the necessary tables and set you up to load the data.

##### ETL