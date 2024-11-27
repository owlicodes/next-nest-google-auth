import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { hash, verify } from "argon2";

import { UsersService } from "../users/users.service";
import { GoogleUserDto } from "./dtos/google-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException("User does not exists.");

    const passwordsMatched = await verify(user.password, password);
    if (!passwordsMatched)
      throw new BadRequestException("Invalid credentials.");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async signIn(user: { id: string; name: string; email: string }) {
    const payload = user;

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleSignIn(data: GoogleUserDto) {
    let user = await this.usersService.findUserByEmail(data.email);

    if (!user) {
      const hashedPassword = await hash(data.id);
      await this.usersService.createUser({
        email: data.email,
        name: data.name,
        password: hashedPassword,
      });

      user = await this.usersService.findUserByEmail(data.email);
    }

    return this.signIn({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }
}
