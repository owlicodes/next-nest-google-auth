import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { EnvConfigModule } from "src/env-config/env-config.module";
import { EnvConfigService } from "src/env-config/env-config.service";

import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    EnvConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      useFactory: async (envConfigService: EnvConfigService) => ({
        secret: envConfigService.getJwtSecret(),
      }),
      inject: [EnvConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
