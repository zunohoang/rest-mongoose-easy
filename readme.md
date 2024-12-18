<div align="center">
  <img src="https://zunohoang.github.io/rest-mongoose-easy/logo.webp" width="270" height="270" alt="Banner"/>
  <h2> Rest-Mongoose-Easy</h2>

[![GitHub Version](https://img.shields.io/badge/GITHUB-GITHUB.COM%2FZUNOHOANG%2FREST--MONGOOSE--EASY-success?style=for-the-badge&logo=github)](https://github.com/zunohoang/rest-mongoose-easy)
[![NPM](https://img.shields.io/badge/NPM-rest--mongoose--easy-red?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/rest-mongoose-easy)
[![Stars](https://img.shields.io/github/stars/zunohoang/rest-mongoose-easy?style=for-the-badge&logo=github)](https://github.com/zunohoang/rest-mongoose-easy/stargazers)
[![Latest Release](https://img.shields.io/github/v/release/zunohoang/rest-mongoose-easy?style=for-the-badge)](https://github.com/zunohoang/rest-mongoose-easy/releases)
[![Last Commit](https://img.shields.io/github/last-commit/zunohoang/rest-mongoose-easy?style=for-the-badge)](https://github.com/zunohoang/rest-mongoose-easy/commits)


</div>

A lightweight and easy-to-use library for creating RESTful APIs with MongoDB and Mongoose. This library provides predefined routes for basic CRUD operations.

##

You can support me by giving this project a star and following me on github [zunohoang](https://github.com/zunohoang).

## Features

- Simple integration with Express.js.
- Automatically generates RESTful routes for Mongoose models.
- Predefined endpoints for `GET`, `POST`, `PUT`, and `DELETE` operations.
- Supports multiple models with minimal setup.

## Installation

```bash
npm install rest-mongoose-easy
```

## Usage

### Basic Setup

1. **Create Mongoose Models**

Define your Mongoose schemas and models as usual. For example:

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const UserModel = mongoose.model('User', UserSchema);
```

2. **Integrate with Express (Basic)**

Use the `rest-mongoose-easy` library to automatically generate RESTful routes for your models:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const RestMongoMicro = require('rest-mongoose-easy');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserModel = require('./models/User');

// Define your configs
const configs = {
    user: {
        schema: UserModel,
    },
    // other
};

// Start the REST service
RestMongoMicro.start(configs, app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

3. **Available Endpoints**

For each schema (e.g., `User`), the following endpoints will be generated:

| HTTP Method | Endpoint                | Description         |
|-------------|-------------------------|---------------------|
| GET         | `/rmz/api/v1/users`    | Get all users       |
| GET         | `/rmz/api/v1/users/:id`| Get a user by ID    |
| POST        | `/rmz/api/v1/users`    | Create a new user   |
| PUT         | `/rmz/api/v1/users/:id`| Update a user by ID |
| DELETE      | `/rmz/api/v1/users/:id`    | Delete a user by ID |

4. **Integrate with Express (Advanced)**

Use the `rest-mongoose-easy` library to automatically generate RESTful routes for your models:

I added two fields `auth` and `response`:
- `auth`: This function will be executed first when a request comes in. I provide you with three parameters `req`, `res`, `next` which you can freely customize and use. Below is an example.
- `response`: This function will be executed after Mongoose returns the values. I provide you with two parameters `req` and `data`. The `data` is the result after the query, and you can customize it to suit your needs.

```javascript
restMongoMicro.start({
    user: {
        schema: require('./models/user.model'),
        auth: (req, res, next) => {
            // The library will provide you with req, res, next so you can freely customize...
            // Example:
            switch (req.method) {
                case 'GET':
                    /*
                        You will code something here to authenticate, if authentication is successful then call next();
                        if authentication fails you can customize res.json("error") for example
                    */
                    return next();
                default:
                    // bla bla
                    return next();
            }

        },
        response: (req, data) => {
            // The library will provide you with req, data so you can freely customize...
            // Example:
            switch (req.method) {
                case 'GET':
                    /*
                        It will return certain fields present in the fields array from the data
                        The dataWithFields function is a function that you have to code yourself, I am just writing pseudo-code
                    */
                    const fields = ['_id', 'username', 'role'];
                    const filteredData = dataWithFields(feilds);
                    return {
                        status: true,
                        data: filteredData
                    }
                default:
                    return {
                        status: true,
                        data: data
                    }
            }

        }
    },
    course: {
        schema: require('./models/course.model')
    }
}, app);
```

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/zunohoang/rest-mongoose-easy).

## License

This project is licensed under the MIT License.

---

Happy coding!
