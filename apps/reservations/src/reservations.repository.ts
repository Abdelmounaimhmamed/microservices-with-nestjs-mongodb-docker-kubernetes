

import { AbstractRepository } from "@app/common";
import { ReservationDocument } from "./reservations/models/reservation.schema";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
    protected readonly logger: Logger = new Logger(ReservationsRepository.name);

    constructor(
        @InjectModel(ReservationDocument.name) reservationModel : Model<ReservationDocument>
    ){
        super(reservationModel)
    }



}