import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Request } from "express";
import { TokenPayloadInterface } from "../interfaces/TokenPayload.interface";
import { UserDocument } from "../users/schema/users.schema";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy , 'jwt') {
    constructor(    
        configService : ConfigService,
        private readonly userService: UsersService
    ){
        super({
            jwtFromRequest : ExtractJwt.fromExtractors([
                (request : any) => {
                    console.log(request?.cookies?.Authentication);
                    console.log(request.headers.cookie.split('Authentication=')[1]);
                    return request.headers.cookie.split('Authentication=')[1] },
            ]),
            secretOrKey: "dsfhshfqskfhlqskhfskfhfhq",
        })

        
    }


    async validate(payload:any ): Promise<UserDocument> {
        const { userId } = payload
        console.log(userId);
        console.log(payload);
        return await this.userService.getUser(userId);
      }


}