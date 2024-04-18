import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey, BelongsToMany,
} from 'sequelize-typescript';
import {SentenceInterface} from "../../../types/sentences/sentence";
import {Users} from "../../users/users.model";

import {SentenceCategory} from "../../category/sentence-category";
import {Category} from "../../category/category.model";

@Table({ tableName: 'sentences_sentence' })
export class Sentence extends Model<Sentence, SentenceInterface> {
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
  sentence: string;

  @Column({ type: DataType.STRING })
  translation: string;

  @Column({ type: DataType.STRING })
  comment: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsToMany(() => Category, () => SentenceCategory)
  categorys: Category[];
}
