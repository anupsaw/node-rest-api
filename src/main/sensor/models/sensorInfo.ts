import { default as mongoose, Document, Schema } from 'mongoose';
export interface SensorInfoModel extends Document {
    _id: any,
    index: number,
    guid: string,
    isActive: boolean,
    value: number,
    sensorType: string,
    time: string
}

const SensorInfoSchema = new Schema({
    index: Number,
    guid: String,
    isActive: Boolean,
    value: Number,
    sensorType: String,
    time: String
}, { timestamps: true });

const SensorInfo = mongoose.model("SensorInfo", SensorInfoSchema);
export default SensorInfo;