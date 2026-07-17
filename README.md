# Notfallbereit – Node.js Backend

<details>
<summary>Click here for more information about Notfallbereit</summary>

> The backend provides the REST API for the Notfallbereit application.
>
> It manages user authentication, emergency profiles, allergies, medications, emergency contacts, QR code access, and communication with the MySQL database.

</details>

## Dev Notes

The SQL statement to initalize the database can be found in ´.../database´.

## Requirements

Before running the backend, make sure the following software is installed:

* Node.js
* npm
* MySQL Server
* WebStorm or another code editor

## Installation

If needed, create a directory:

```bash
mkdir notfallbereit
cd notfallbereit
```

Clone the repository:

```bash
git clone RELEASE
```

Install all required dependencies:

```bash
npm install
```

This command installs all packages listed in the `package.json` file, including:

- express
- mysql2
- bcrypt
- jsonwebtoken
- dotenv
- bcrypt
- uuid
- validator

## Database

Before starting the backend, make sure that:

- the MySQL server is running,
- the required database has been created,
- the database configuration in the `..\database\**DB.js**` file matches your local MySQL installation.

## Running the server

Start the backend:

```bash
npm start
```

## Useful npm Commands

Install project dependencies:

```bash
npm install
```

Install a new package:

```bash
npm install <package-name>
```

Update installed packages:

```bash
npm update
```
