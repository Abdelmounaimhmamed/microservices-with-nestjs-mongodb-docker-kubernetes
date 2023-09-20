import {  Module  } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common/Logger/Logger.module';
import {JwtModule} from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@app/common';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule , LoggerModule,  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>("JWT_SECRET"),
      signOptions: {
        expiresIn: configService.get("JWT_EXPERATION") 
      }
    }),
    inject: [ConfigService]
  }) ],
  controllers: [AuthController],
  providers: [AuthService,ConfigService,JwtStrategy],
})
export class AuthModule {
 
}
