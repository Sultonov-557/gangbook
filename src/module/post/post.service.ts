import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import * as db from '../../database/database';

@Injectable()
export class PostService {
  async create(createPostDto: CreatePostDto) {
    return await db.queryAll('INSET INTO user SET ?', createPostDto);
  }

  async findAll() {
    return await db.queryAll('SELECT * FROM user');
  }

  async findOne(id: number) {
    return await db.queryAll(`SELECT * FROM user WHERE ID=${id}`);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await db.queryAll(
      `UPDATE * FROM user SET ? WHERE ID=${id}`,
      updatePostDto,
    );
  }

  async remove(id: number) {
    return await db.queryAll(`DELETE * FROM user WHERE ID=${id}`);
  }
}
