import { Injectable } from "@nestjs/common";
import * as db from "../../database/database";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  async login(body) {
    const { username, password } = body;

    if (!username || !password) {
      return { success: false, error: "no password or username" };
    }
    const user = await db.query(
      `SELECT * FROM user WHERE username='${username}'`,
    );

    if (!user || user.password != password) {
      return { success: false, error: "wrong password or username" };
    }

    const token = jwt.sign({ ID: user.ID }, "secret", { expiresIn: "10h" });
    await db.query(`UPDATE user SET ? WHERE ID="${user.ID}"`, { token });

    return { success: true, token };
  }

  async register(body) {
    const { username, password } = body;
    if (!username || !password) {
      return { success: false, error: "no username or password" };
    }

    const user = await db.query(
      `SELECT * FROM user WHERE username='${username}'`,
    );

    if (user) {
      return { success: false, error: "username already taken" };
    }

    await db.query("INSERT INTO user SET ?", body);
    return { success: true };
  }

  async verify(body) {
    const { token } = body;

    const { ID } = await jwt.verify(token, "secret");

    const user = await db.query(`SELECT * FROM user WHERE ID=${ID}`);

    if (!user) {
      return { success: false };
    }

    return { success: true, ID };
  }
}
