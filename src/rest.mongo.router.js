const RestController = require('./rest.mongo.controller');

class RestMongoRouter {
    constructor(app, model, key) {
        this.model = model;
        this.app = app;
        this.key = key.toLowerCase() + "s";
        this.controller = new RestController(this.model);
    }

    createRouter() {
        this.app.get(`/rmz/api/v1/${this.key}`, async (req, res) => {
            try {
                const data = await this.controller.get();
                return res.send(data);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        });

        this.app.get(`/rmz/api/v1/${this.key}/:id`, async (req, res) => {
            try {
                const { id } = req.params;
                const data = await this.controller.getById(id);
                return res.send(data);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        });

        this.app.post(`/rmz/api/v1/${this.key}`, async (req, res) => {
            try {
                const data = await this.controller.create(req.body);
                return res.send(data);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        });

        this.app.put(`/rmz/api/v1/${this.key}/:id`, async (req, res) => {
            try {
                const { id } = req.params;
                const data = await this.controller.update(id, req.body);
                return res.send(data);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        });

        this.app.delete(`/rmz/api/v1/${this.key}/:id`, async (req, res) => {
            try {
                const { id } = req.params;
                const data = await this.controller.delete(id);
                return res.send(data);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        });
    }
}

module.exports = RestMongoRouter;