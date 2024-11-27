import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";

import { TUser } from "src/types";

import { CreateUserDto } from "../users/dtos/create-user.dto";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { GoogleUserDto } from "./dtos/google-user.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post("sign-up")
  signUp(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  signIn(@Request() req: { user: TUser }) {
    return this.authService.signIn(req.user);
  }

  @Post("google-sign-in")
  googleSignIn(@Body() body: GoogleUserDto) {
    return this.authService.googleSignIn(body);
  }
}
