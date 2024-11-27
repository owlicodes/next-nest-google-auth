import { Controller, Get, Request, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TUser } from "src/types";

import { UsersService } from "./users.service";

@Controller({
  path: "users",
  version: "1",
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: { user: TUser }) {
    return this.usersService.findUserById(req.user.id);
  }
}
