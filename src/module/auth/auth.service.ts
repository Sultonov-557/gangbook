import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { log } from "console";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async login(body) {
    const { username, password } = body;

    if (!username || !password) {
      return { success: false, error: "no password or username" };
    }

    const user: User = (
      await this.userRepository.find({
        where: { username },
      })
    )[0];

    log(body, user);
    if (!user || (await compare(user.password, password))) {
      return { success: false, error: "wrong password or username" };
    }

    const token = jwt.sign({ ID: user.ID }, "secret", { expiresIn: "10h" });

    return { success: true, token };
  }

  async register(body) {
    const { username, password } = body;
    if (!username || !password) {
      return { success: false, error: "no username or password" };
    }

    const userExists: boolean = await this.userRepository.exist({
      where: { username },
    });

    if (userExists) {
      return { success: false, error: "username already taken" };
    }

    await this.userRepository.insert({ username, password });

    return { success: true };
  }

  async verify(body) {
    const { token } = body;

    try {
      const { ID } = await jwt.verify(token, "secret");

      const userExists = await this.userRepository.exist({ where: { ID } });

      if (!userExists) {
        return { success: false };
      }

      return { success: true };
    } catch {
      return { success: false };
    }
  }
}
