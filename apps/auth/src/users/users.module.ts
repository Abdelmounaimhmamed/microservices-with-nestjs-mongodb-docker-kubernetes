import { Module } from "@nestjs/common";
import { usersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { DatabaseModule } from "@app/common";
import { UserDocument, UserSchema } from "./schema/users.schema";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../strategies/local-strategie";
import { JwtStrategy } from "../strategies/jwt.strategy";



@Module({
    imports:  [DatabaseModule , DatabaseModule.forFeature([{name: UserDocument.name , schema : UserSchema}])],
    controllers: [usersController],
    providers: [UsersService , UsersRepository,LocalStrategy,JwtStrategy],
    exports: [UsersService,UsersRepository] 
})
export class UsersModule {
    constructor(private readonly usersService: UsersService){}

}