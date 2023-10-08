import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() body) {
    return this.authService.login(body);
  }

  @Post("/register")
  register(@Body() body) {
    return this.authService.register(body);
  }

  @Post("/verify")
  verify(@Body() body) {
    return this.authService.verify(body);
  }
}
