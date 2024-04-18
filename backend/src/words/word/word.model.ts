import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey, BelongsToMany,
} from 'sequelize-typescript';
import {WordInterface} from "../../../types/words/word";
import {Users} from "../../users/users.model";
import {Translation} from "../translation/translation.model";
import {WordTranslation} from "../translation/word-translation";
import {Category} from "../../category/category.model";
import {WordCategory} from "../../category/word-category";

@Table({ tableName: 'words_word' })
export class Word extends Model<Word, WordInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  word: string;

  @Column({ type: DataType.STRING })
  comment: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsToMany(() => Translation, () => WordTranslation)
  translations: Translation[];

  @BelongsToMany(() => Category, () => WordCategory)
  categorys: Category[];
}
