import { IsEmail } from "class-validator";

export class CreateUserDto {
    username: string;

    @IsEmail()
    email: string;

    image: string;

    password: string;
}
