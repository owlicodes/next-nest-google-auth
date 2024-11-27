import { IsEmail, IsString } from "class-validator";

export class GoogleUserDto {
  @IsString()
  id: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
