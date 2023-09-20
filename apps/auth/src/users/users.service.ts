import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/CreateUser.dto";
import * as bcrypt from "bcryptjs";
import { GetUserDto } from "./dto/GetUser.dto";
import { UserDocument } from "./schema/users.schema";

@Injectable()
export class UsersService {

    constructor(private readonly userRepository : UsersRepository){}

    async validateCreateUserDto(createUserDto : CreateUserDto) {
        const user = await this.userRepository.findOne({email : createUserDto.email});
        if(user) {
            throw new HttpException("duplicated email !", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return ;
    }

    async create(userData : CreateUserDto){ 
        await this.validateCreateUserDto(userData);
        return this.userRepository.create({
            ...userData ,
            password : await bcrypt.hash(userData.password , 10)
        })
    }

    async validateUsers(email : string , password : string ) {
        const isFound = await this.userRepository.findOne({email});
        if(!isFound) {
            throw new UnauthorizedException("Not authorized !")
        }
        const isPassword = await bcrypt.compare(password , isFound.password);
        if(!isPassword) {
            throw new UnauthorizedException("Not allowed , wrong credentials !");
        }
        return isFound;
    }
   
    async getUser({_id} ) : Promise<UserDocument > {
        console.log(_id);
        const user = await  this.userRepository.findOne({_id});
        console.log(user);
        return user;
    }



}