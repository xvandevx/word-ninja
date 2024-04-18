import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey, BelongsToMany,
} from 'sequelize-typescript';
import {CategoryInterface} from "../../types/categorys";
import {Users} from "../users/users.model";
import {Word} from "../words/word/word.model";
import {WordCategory} from "./word-category";
import {SentenceCategory} from "./sentence-category";
import {Sentence} from "../sentences/sentense/sentence.model";

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryInterface> {
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
  name: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsToMany(() => Word, () => WordCategory)
  words: Word[];

  @BelongsToMany(() => Sentence, () => SentenceCategory)
  sentences: Sentence[];
}
