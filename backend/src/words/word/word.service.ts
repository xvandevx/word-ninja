import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Word } from './word.model';
import { WordDto } from './dto/word.dto';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(Word) private wordRepository: typeof Word,
  ) {}

  async add(dto: WordDto) {
    await this.wordRepository.create(dto);
  }

  async update(id: number, dto: WordDto) {
    await this.wordRepository.update(dto, { where: { id } });
  }

  async getAll() {
    return await this.wordRepository.findAll({
      include: { all: true },
    });
  }

  async delete(id) {
    const row = await this.wordRepository.findOne({
      where: { id },
      order: [['id', 'ASC']],
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
