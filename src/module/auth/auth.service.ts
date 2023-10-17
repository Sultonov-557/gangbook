import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { log } from "console";
import { compare, hash } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async login(body) {
    const { username, password } = body;

    if (!username || !password) {
      throw new BadRequestException("username or password not given");
    }

    const user: User = (
      await this.userRepository.find({
        where: { username },
      })
    )[0];

    log(body, user);
    if (!user || (await compare(user.password, password))) {
      throw new BadRequestException("username or password wrong");
    }

    const token = jwt.sign({ ID: user.ID }, "secret", { expiresIn: "10h" });

    return { success: true, token };
  }

  async register(body) {
    const { username, password, email } = body;
    if (!username || !password || !email) {
      throw new BadRequestException("username or password or emile not given");
    }

    const userExists: boolean = await this.userRepository.exist({
      where: { username },
    });

    if (userExists) {
      throw new BadRequestException("username or emile already taken");
    }

    const hashedPassword = hash(password, 5);

    await this.userRepository.insert({
      username,
      password: hashedPassword,
      email,
    });

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
