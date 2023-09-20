import { AsbtractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({versionKey: false})
export class ReservationDocument  extends AsbtractDocument{

    @Prop()
    timestamp: Date;

    @Prop()
    startDate : Date;

    @Prop()
    endDate: Date;

    @Prop()
    userId: string;

    @Prop()
    placeId : string;

    @Prop()
    invoiceId : string;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument);


