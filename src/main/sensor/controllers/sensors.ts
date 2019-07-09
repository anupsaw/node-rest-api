import { default as SensorInfo } from "../models/sensorInfo";
import { Router, NextFunction, Request, Response } from "express";

export class Sensors {

    // static api to define the routes for the controller
    public static routes() {
        const routes = Router();
        const sensorInfo = new Sensors();


        routes.route('/info/:page/:size')
            .get(sensorInfo.getSensorsDetailsPerPage)

        routes.route('/info/:page')
            .get(sensorInfo.getSensorsDetailsPerPage)

        routes.route('/info')
            .get(sensorInfo.getSensorsDetails)
            .post(sensorInfo.save);
        routes.route('/bulk-save')
            .post(sensorInfo.saveBulk);

        routes.route('/test')
            .get(sensorInfo.get);
        return routes;
    }

    /** get sensors details from mongo db server  rest api url: localhost:12345/sensors/info */
    public async getSensorsDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(req);

        try {
            const data = await SensorInfo.find();
            res.send(data);
        } catch (error) {
            next(error);
        }

    }

    // pagination  rest api url: localhost:12345/sensors/info/1/10
    public async getSensorsDetailsPerPage(req: Request, res: Response, next: NextFunction): Promise<void> {

        let data;
        const page = parseInt(req.params.page);
        const size = parseInt(req.params.size) || 10;

        try {
            if (page) {
                data = await SensorInfo.find().skip(page).limit(size);
                res.send(data);
            } else {
                next(new Error('Request param should be numbers'));
            }
        } catch (error) {
            next(error);
        }



    }

    public async save(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const info = new SensorInfo(req.body);
            const data = await info.save();
            res.send(data);
        } catch (error) {
            next(error);
        }

    }

    public saveBulk(req: Request, res: Response, next: NextFunction): void {

        console.log(req.body);

        if (Array.isArray(req.body)) {
            req.body.forEach((item: any) => {
                const info = new SensorInfo(item);
                info.save();
            });
        } else {
            next(new Error('bulk data should be an array'));
        }
        res.json('success');

    }

    public get(req: Request, res: Response, next: NextFunction) {
        console.log(req);
        res.json('testing api is working fine');
    }
}
