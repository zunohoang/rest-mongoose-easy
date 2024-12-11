const RestMongoRouter = require('./rest.mongo.router');

class RestMongoMicro {

    static instance = new RestMongoMicro();

    static getInstance() {
        if (RestMongoMicro.instance == null) {
            return new RestMongoMicro();
        }
        return RestMongoMicro.instance;
    }

    start(schemas, app) {
        console.log("STATUS: RUNNING LOAD RESTMONGO MICRO");
        for (let key in schemas) {
            const model = schemas[key];
            const router = new RestMongoRouter(app, model, key);
            router.createRouter();
        }

        console.log("STATUS: RUNNING LOAD RESTMONGO MICRO SUCCESS");
    }

}

module.exports = RestMongoMicro.getInstance();