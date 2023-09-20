import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/Current-user.decorator';
import { UserDocument } from './users/schema/users.schema';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt.guard';


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post("/login")
  @UseGuards(AuthGuard("local"))
  async loginUser(@CurrentUser() user : UserDocument , @Res({passthrough : true}) response : Response) : Promise<any> {
    await this.authService.login(user , response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern("authenticate")
  async authenticate(){
      
  }

  


}
