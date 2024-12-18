const RestController = require('./rest.mongo.controller');

class RestMongoRouter {
    constructor(app, model, key) {
        this.model = model;
        this.app = app;
        this.key = key;
        this.controller = new RestController(this.model);
    }

    auth(req, res, next) {
        next();
    }

    response(req, data) {
        return {
            status: true,
            data: data
        };
    }

    createRouter(_auth, _response) {
        if (_auth) {
            this.auth = _auth;
        }

        if (_response) {
            this.response = _response;
        }

        /*
            User authentication
        */
        this.app.use(`/rmz/api/v1/${this.key}`, this.auth);

        this.app.get(`/rmz/api/v1/${this.key}`, async (req, res) => {
            try {
                const data = await this.controller.get();
                return res.status(200).json(this.response(req, data));
            } catch (error) {
                return res.status(500).json({
                    status: false,
                    msg: error.message
                })
            }
        });

        this.app.get(`/rmz/api/v1/${this.key}/:id`, async (req, res) => {
            try {
                const { id } = req.params;
                const data = await this.controller.getById(id);
                if (data) {
                    return res.status(200).json(this.response(req, data));
                }
                return this.status(404).json({
                    status: false,
                    msg: "Not found"
                });
            } catch (error) {
                return res.status(500).json({
                    status: false,
                    msg: error.message
                })
            }
        });

        this.app.post(`/rmz/api/v1/${this.key}`, async (req, res) => {
            try {
                const data = await this.controller.create(req.body);
                return res.status(201).json(this.response(req, data));
            } catch (error) {
                return res.status(500).json({
                    status: false,
                    msg: error.message
                })
            }
        });

        this.app.put(`/rmz/api/v1/${this.key}/:id`, async (req, res) => {
            try {
                const { id } = req.params;
                const data = await this.controller.update(id, req.body);
                return res.status(200).json(this.response(req, data));
            } catch (error) {
                return res.status(500).json({
                    status: false,
                    msg: error.message
                })
            }
        });

        this.app.delete(`/rmz/api/v1/${this.key}/:id`, async (req, res) => {
            try {
                const { id } = req.params;
                const data = await this.controller.delete(id);
                return res.status(200).json(this.response(req, data));
            } catch (error) {
                return res.status(500).json({
                    status: false,
                    msg: error.message
                })
            }
        });
    }
}

module.exports = RestMongoRouter;