import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Word } from './word.model';
import { WordDto } from './dto/word.dto';
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
      });
      if (dto.categorys) {
        await word.$set(
            'categorys',
            dto.categorys.split(',').map((id) => Number(id)),
        );
      }
    }
  }

  async setMinus(id: number, userId) {
    const word = await this.wordRepository.findByPk(id);
    if (word.dataValues.userId === userId) {
      await word.update({
        minuses: word.dataValues.minuses + 1,
      });
    }
  }

  async setPlus(id: number, userId) {
    const word = await this.wordRepository.findByPk(id);
    console.log(word.dataValues.userId, userId)
    if (word.dataValues.userId === userId) {
      console.log(word.dataValues)
      await word.update({
        pluses: word.dataValues.pluses + 1,
      });
    }
  }

  async setStatus(id: number, status: WordStatuses,  userId) {
    const word = await this.wordRepository.findByPk(id);
    if (word.dataValues.userId === userId) {
      await word.update({
        status: status,
      });
    }
  }

  async getAll(userId) {
    return await this.wordRepository.findAll({
      where: { userId },
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
      order: [['id', 'ASC']],
    });
    if (row) {
      await row.destroy(); // deletes the row
    }
  }
}
