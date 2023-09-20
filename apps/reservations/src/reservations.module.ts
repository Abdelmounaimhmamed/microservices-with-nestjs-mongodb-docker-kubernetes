import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationSchema } from './reservations/models/reservation.schema';
import { LoggerModule } from '@app/common/Logger/Logger.module';
import { ClientsModule } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common/Constant/services';

@Module({
  imports: [DatabaseModule, 
    DatabaseModule.forFeature([{name: ReservationDocument.name , schema: ReservationSchema}]),
    LoggerModule,
    ClientsModule.register([
      {name: AUTH_SERVICE}

      
    ])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository]
})


export class ReservationsModule {}
