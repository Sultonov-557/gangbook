import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  async login(body) {
    const { username, password } = body;

    if (!username || !password) {
      return { success: false, error: "no password or username" };
    }

    //TODO get user from database
    const user: any = {};

    if (!user || user.password != password) {
      return { success: false, error: "wrong password or username" };
    }

    const token = jwt.sign({ ID: user.ID }, "secret", { expiresIn: "10h" });

    //TODO set user token to database

    return { success: true, token };
  }

  async register(body) {
    const { username, password } = body;
    if (!username || !password) {
      return { success: false, error: "no username or password" };
    }

    //TODO get user from database
    const user: any = {};

    if (user) {
      return { success: false, error: "username already taken" };
    }

    //TODO insert new user to database

    return { success: true };
  }

  async verify(body) {
    console.log(body);

    const { token } = body;

    try {
      const { ID } = await jwt.verify(token, "secret");

      //TODO get user from database
      const user = {};

      if (!user) {
        return { success: false };
      }

      return { success: true, ID };
    } catch {
      return { success: false };
    }
  }
}
