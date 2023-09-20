import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDocument } from "../users/schema/users.schema";


export const  CurrentUser = createParamDecorator(
    (_data: unknown , ctx : ExecutionContext) : UserDocument => {
        return ctx.switchToHttp().getRequest().user;
    }
)