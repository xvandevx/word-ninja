import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sentence } from './sentence.model';
import { SentenceDto } from './dto/sentence.dto';

@Injectable()
export class SentenceService {
  constructor(
    @InjectModel(Sentence) private sentenceRepository: typeof Sentence,
  ) {}

  async add(dto: SentenceDto) {
    await this.sentenceRepository.create(dto);
  }

  async update(id: number, dto: SentenceDto) {
    await this.sentenceRepository.update(dto, { where: { id } });
  }

  async getAll() {
    return await this.sentenceRepository.findAll({
      include: { all: true },
    });
  }

  async delete(id) {
    const row = await this.sentenceRepository.findOne({
      where: { id },
      order: [['id', 'ASC']],
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
