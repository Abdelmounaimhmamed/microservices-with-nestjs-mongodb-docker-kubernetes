import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService:ConfigService) => ({
            uri: configService.get("DB_URI")
        }),
        inject:[ConfigService]
    })]
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]){
        return MongooseModule.forFeature(models)
    }
}
