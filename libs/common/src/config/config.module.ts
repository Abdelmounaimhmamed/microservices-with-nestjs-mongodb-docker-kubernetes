import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import * as  Joi from 'joi';

@Module({
    imports: [NestConfigModule.forRoot({
        isGlobal:true,
        validationSchema: Joi.object({
            DB_URI: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
            JWT_EXPERATION : Joi.string().required()
        })
    })],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule {}
