import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as db from '../../database/database';

@Injectable()
export class AuthService {
  async create(createAuthDto: CreateAuthDto) {
    return await db.queryAll('INSET INTO user SET ?', createAuthDto);
  }

  async findAll() {
    return await db.queryAll('SELECT * FROM user');
  }

  async findOne(id: number) {
    return await db.queryAll(`SELECT * FROM user WHERE ID=${id}`);
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    return await db.queryAll(
      `UPDATE * FROM user SET ? WHERE ID=${id}`,
      updateAuthDto,
    );
  }

  async remove(id: number) {
    return await db.queryAll(`DELETE * FROM user WHERE ID=${id}`);
  }
}
