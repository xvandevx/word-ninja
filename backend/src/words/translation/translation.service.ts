import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Translation } from './translation.model';
import { TranslationDto } from './dto/translation.dto';

@Injectable()
export class TranslationService {
  constructor(
    @InjectModel(Translation) private translationRepository: typeof Translation,
  ) {}

  async add(dto: TranslationDto) {
    await this.translationRepository.create(dto);
  }

  async update(id: number, dto: TranslationDto) {
    await this.translationRepository.update(dto, { where: { id } });
  }

  async getAll() {
    return await this.translationRepository.findAll({
      include: { all: true },
    });
  }

  async delete(id) {
    const row = await this.translationRepository.findOne({
      where: { id },
      order: [['id', 'ASC']],
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
