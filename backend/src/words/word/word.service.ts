import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Word } from './word.model';
import {WordStatuses} from "../../../types/words/word";
import {Category} from "../../category/category.model";

@Injectable()
export class WordService {
  constructor(
    @InjectModel(Word) private wordRepository: typeof Word,
  ) {}

  async add(dto: any, userId) {
    const word = await this.wordRepository.create({
      isActive: true,
      word: dto.word,
      translation: dto.translation,
      pluses: 0,
      minuses: 0,
      status: dto.status,
      learnCount: 0,
      comment: dto.comment,
      userId
    });

    if (dto.categorys) {
      await word.$set(
          'categorys',
          dto.categorys.split(',').map((id) => Number(id)),
      );
    }
  }

  async update(id: number, dto: any, userId) {
    const word = await this.wordRepository.findByPk(id);
    if (word.dataValues.userId === userId) {
      await word.update({
        word: dto.word,
        translation: dto.translation,
        comment: dto.comment,
        status: dto.status,
        learnCount: dto.learnCount,
      });
      if (dto.categorys) {
        await word.$set(
            'categorys',
            dto.categorys.split(',').map((id) => Number(id)),
        );
      }
    }
    return word;
  }

  async setMinus(id: number, userId) {
    const word = await this.wordRepository.findByPk(id);
    if (word.dataValues.userId === userId) {
      await word.update({
        minuses: word.dataValues.minuses + 1,
      });
    }
    return word;
  }

  async setPlus(id: number, userId) {
    const word = await this.wordRepository.findByPk(id);
    if (word.dataValues.userId === userId) {
      await word.update({
        pluses: word.dataValues.pluses + 1,
      });
    }
    return word;
  }

  async setStatus(id: number, dto,  userId) {
    const word = await this.wordRepository.findByPk(id);
    if (word.dataValues.userId === userId) {
      const updateData: any  = {
        status: +dto.status,
      }
      if (dto.status == WordStatuses.Learned) {
        //const date = new Date();
        updateData.lastStatusDate = new Date().toISOString();
        //updateData.lastStatusDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        updateData.learnCount = +word.dataValues.learnCount + 1;
      }
      await word.update(updateData);
    }
    return word;
  }

  async getAll(userId) {
    return await this.wordRepository.findAll({
      where: { userId },
      order: [['id', 'desc']],
      include: [{
        model: Category,
        attributes: ['id'],
      }],
    });
  }

  async getById(id, userId) {
    return await this.wordRepository.findAll({
      where: { id, userId },
      include: {
        all: true
      }
    });
  }

  async delete(id, userId) {
    const row = await this.wordRepository.findOne({
      where: { id, userId },
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
