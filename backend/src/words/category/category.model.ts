import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey, BelongsToMany,
} from 'sequelize-typescript';
import {CategoryInterface} from "../../../types/words/categorys";
import {Users} from "../../users/users.model";
import {Word} from "../word/word.model";
import {WordCategory} from "./word-categoy";

@Table({ tableName: 'words_category' })
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
}
