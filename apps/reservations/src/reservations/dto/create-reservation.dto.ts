import { Type } from "class-transformer";
import {IsDate, IsString, IsNotEmpty } from "class-validator";

export class CreateReservationDto {
    
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    startDate : Date;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    @IsString()
    placeId : string;

    @IsNotEmpty()
    @IsString()
    invoiceId : string;
}
