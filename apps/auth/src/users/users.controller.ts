import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { CurrentUser } from "../decorators/Current-user.decorator";
import { UserDocument } from "./schema/users.schema";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "apps/auth/src/guards/jwt.guard";


@Controller("users")
export class usersController {

    constructor(
        private readonly userService: UsersService
    ){}

    @Post()
    async createUser( @Body() userData : CreateUserDto){
        return await this.userService.create(userData);
    }
    
    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user : UserDocument) {
        return user;
    }

}