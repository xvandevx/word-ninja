import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sentence } from './sentence.model';
import {Category} from "../../category/category.model";
import {WordStatuses} from "../../../types/words/word";

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
      pluses: 0,
      minuses: 0,
      status: dto.status,
      learnCount: 0,
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
        status: dto.status,
        learnCount: dto.learnCount,
      });
      if (dto.categorys) {
        await sentence.$set(
            'categorys',
            dto.categorys.split(',').map((id) => Number(id)),
        );
      }
    }
  }

  async setMinus(id: number, userId) {
    const sentence = await this.sentenceRepository.findByPk(id);
    if (sentence.dataValues.userId === userId) {
      await sentence.update({
        minuses: sentence.dataValues.minuses + 1,
      });
    }
  }

  async setPlus(id: number, userId) {
    const sentence = await this.sentenceRepository.findByPk(id);
    if (sentence.dataValues.userId === userId) {
      await sentence.update({
        pluses: sentence.dataValues.pluses + 1,
      });
    }
  }

  async setStatus(id: number, dto,  userId) {
    const sentence = await this.sentenceRepository.findByPk(id);
    if (sentence.dataValues.userId === userId) {
      const updateData: any  = {
        status: +dto.status,
      }
      if (dto.status == WordStatuses.Learned) {
        //const date = new Date();
        updateData.lastStatusDate = new Date().toISOString();
        //updateData.lastStatusDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        updateData.learnCount = +sentence.dataValues.learnCount + 1;
      }
      await sentence.update(updateData);
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
