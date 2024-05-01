import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async add(dto: CategoryDto, userId: number) {
    await this.categoryRepository.create({
      isActive: true,
      name: dto.name,
      type: dto.type,
      userId
    });
  }

  async update(id: number, dto: CategoryDto) {
    await this.categoryRepository.update({
      name: dto.name,
      type: dto.type,
    }, { where: { id } });
  }

  async getAll(userId) {
    return await this.categoryRepository.findAll({
      where: { userId },
      order: [['id', 'ASC']],
    });
  }

  async delete(id) {
    const row = await this.categoryRepository.findOne({
      where: { id },
      order: [['id', 'ASC']],
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
