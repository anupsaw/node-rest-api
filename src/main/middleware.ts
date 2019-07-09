import bodyParser from 'body-parser';
import cors from 'cors';
import { Application } from 'express';
import mongoose from 'mongoose';
import { serverConfig } from '../settings'

export class AppMiddleware {

    public static init(app: Application) {
        //mongodb connection
        const uri = serverConfig.dbUrl;
        mongoose.connect(uri, { useNewUrlParser: true })
            .then(() => console.log('Connection is successfull'))
            .catch((error) => console.error(error.message));


        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    }
}