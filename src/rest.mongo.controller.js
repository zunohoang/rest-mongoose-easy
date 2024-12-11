class RestController {

    constructor(model) {
        this.model = model;
    }

    async get() {
        return this.model.find();
    }

    async getById(id) {
        return this.model.findById(id);
    }

    async create(data) {
        return this.model.create(data);
    }

    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }

}

module.exports = RestController;

