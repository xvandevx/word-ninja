import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sentence } from './sentence.model';
import { SentenceDto } from './dto/sentence.dto';
import {Category} from "../../category/category.model";

@Injectable()
export class SentenceService {
  constructor(
    @InjectModel(Sentence) private sentenceRepository: typeof Sentence,
  ) {}

  async add(dto: any, userId) {
    const sentence = await this.sentenceRepository.create({
      isActive: true,
      sentence: dto.sentence,
      translation: dto.translation,
      comment: dto.comment,
      userId
    });

    if (dto.categorys) {
      await sentence.$set(
          'categorys',
          dto.categorys.split(',').map((id) => Number(id)),
      );
    }
  }

  async update(id: number, dto: any, userId) {
    const sentence = await this.sentenceRepository.findByPk(id);
    if (sentence.dataValues.userId === userId) {
      await sentence.update({
        sentence: dto.sentence,
        translation: dto.translation,
        comment: dto.comment,
      });
      if (dto.categorys) {
        await sentence.$set(
            'categorys',
            dto.categorys.split(',').map((id) => Number(id)),
        );
      }
    }
  }

  async getAll(userId) {
    return await this.sentenceRepository.findAll({
      where: { userId },
      include: [{
        model: Category,
        attributes: ['id'],
      }],
    });
  }

  async delete(id, userId) {
    const row = await this.sentenceRepository.findOne({
      where: { id, userId },
      order: [['id', 'ASC']],
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
