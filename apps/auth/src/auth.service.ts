import { HttpException, HttpStatus, Injectable, Session, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from './users/schema/users.schema';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './users/dto/CreateUser.dto';
import { UsersRepository } from './users/users.repository';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  
  constructor(
    private readonly configService : ConfigService,
    private readonly jwtService:JwtService,
    ){}

  

  async login(user : UserDocument , response: Response) {
    // const isFound = await this.usersRepository.findOne({email : user.email});
    // if(!isFound){
    //   throw new UnauthorizedException("No user found ! , wrong credentials ");
    // }
    // const isPassword = await bcrypt.compare(user.password , isFound.password);
    // console.log(isPassword);
    // if(!isPassword){
    //   throw new UnauthorizedException("No user found ! , wrond data !");
    // }
    // const token =  this.jwtService.sign({userId : isFound._id , email :isFound.email});
    // return { ...user , token};
    const tokenPayload = {
      userId : user._id,
    }
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + this.configService.get("JWT_EXPERATION"))
    const token = this.jwtService.sign(tokenPayload);
    response.cookie("Authentication" , token , {
      httpOnly : true,
      expires: expires
    })


    
  }

 

}
