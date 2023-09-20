import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes , Types } from "mongoose";



@Schema({versionKey: false})
export class AsbtractDocument {
    
    @Prop({type : SchemaTypes.ObjectId})
    _id:  Types.ObjectId ;


}   