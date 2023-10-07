import { Injectable } from "@nestjs/common";
import * as db from "../../database/database";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  async login(body) {
    const { username, password } = body;
    if (!username || !password) {
      return "no password or username";
    }
    const user = await db.query(
      `SELECT * FROM user WHERE username='${username}'`,
    );

    if (!user || user.password != password) {
      return "wrong password or username";
    }
    const token = jwt.sign({ ID: user.ID }, "secret", "10m");
    console.log(token);

    return token;
  }

  async register(body) {
    const { username, password } = body;
    if (!username || !password) {
      return "no username or password";
    }

    const user = await db.query(
      `SELECT * FROM user WHERE username='${username}'`,
    );

    if (user) {
      return "username already taken";
    }

    await db.query("INSERT INTO user SET ?", body);
  }
}
