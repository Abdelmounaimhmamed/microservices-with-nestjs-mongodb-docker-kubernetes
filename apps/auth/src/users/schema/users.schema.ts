import { AsbtractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({versionKey: false})
export class UserDocument extends AsbtractDocument {


    @Prop()
    email : string;

    @Prop()
    password: string;

    

}


export const UserSchema = SchemaFactory.createForClass(UserDocument);
