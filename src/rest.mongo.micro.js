const RestMongoRouter = require('./rest.mongo.router');

class RestMongoMicro {

    static instance = new RestMongoMicro();

    static getInstance() {
        if (RestMongoMicro.instance == null) {
            return new RestMongoMicro();
        }
        return RestMongoMicro.instance;
    }

    start(configs, app) {
        console.log("STATUS: RUNNING LOAD RESTMONGO MICRO");
        for (let key in configs) {
            const config = configs[key];
            const model = configs[key].schema;
            const router = new RestMongoRouter(app, model, key.toLowerCase() + "s");
            router.createRouter(config.auth, config.response);
        }

        console.log("STATUS: RUNNING LOAD RESTMONGO MICRO SUCCESS");
    }

}

module.exports = RestMongoMicro.getInstance();