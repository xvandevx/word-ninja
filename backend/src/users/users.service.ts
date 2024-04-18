import { Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private usersRepository: typeof Users
  ) {
    this.addInitRoleAndUser();
  }

  async addInitRoleAndUser() {
    const admin = await this.getAdmin();

    if (!admin) {
      await this.add({
        name: 'Admin',
        email: 'admin@admin.com',
      });
    }
  }

  async add(dto: UserDto) {
    const user = await this.usersRepository.create(dto);
  }

  async update(id: number, dto: UserDto) {
    const content = await this.usersRepository.findByPk(id);
    await content.update({
      name: dto.name,
      email: dto.email,
    });
  }

  async getAdmin() {
    return await this.usersRepository.findOne({ where: { name: 'Admin' } });
  }
  async getAll() {
    return await this.usersRepository.findAll({ include: { all: true } });
  }

  async delete(id) {
    const row = await this.usersRepository.findOne({
      where: { id },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
