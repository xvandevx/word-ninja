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
      isActive: dto.isActive,
      name: dto.name,
      userId
    });
  }

  async update(id: number, dto: CategoryDto) {
    await this.categoryRepository.update(dto, { where: { id } });
  }

  async getAll(type) {
    return await this.categoryRepository.findAll();
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
