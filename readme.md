# rest-mongoose-easy

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

2. **Integrate with Express**

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

// Define your schemas
const schemas = {
    User: UserModel,
};

// Start the REST service
RestMongoMicro.start(schemas, app);

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

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/zunohoang/rest-mongoose-easy).

## License

This project is licensed under the MIT License.

---

Happy coding!
