import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey, BelongsToMany,
} from 'sequelize-typescript';
import {WordInterface} from "../../../types/words/word";
import {Users} from "../../users/users.model";
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
  translation: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  pluses: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  minuses: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  status: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  learnCount: number;

  @Column({ type: DataType.STRING })
  lastStatusDate: string;

  @Column({ type: DataType.STRING })
  comment: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsToMany(() => Category, () => WordCategory)
  categorys: Category[];
}
