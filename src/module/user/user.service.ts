import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { hash } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, password, role, username } = createUserDto;
      const hashedPassword = await hash(password, 5);

      await this.userRepo.insert({
        email,
        password: hashedPassword,
        username,
        role,
      });

      return { success: true };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    return { success: true, data: await this.userRepo.find() };
  }

  async findOne(id: number) {
    return {
      success: true,
      data: await this.userRepo.findBy({ ID: id }),
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.userRepo.exist({ where: { ID: id } });

    if (!userExists) {
      throw new BadRequestException(`user not exists`);
    }

    if (updateUserDto.email) {
      const emailExists = await this.userRepo.exist({
        where: { email: updateUserDto.email },
      });

      if (emailExists) {
        throw new BadRequestException(
          `user with email ${updateUserDto.email} already exists`,
        );
      }
    }

    await this.userRepo.update(updateUserDto, { ID: id });
    return { success: true };
  }

  async remove(id: number) {
    await this.userRepo.delete({ ID: id });
    return { success: true };
  }
}
