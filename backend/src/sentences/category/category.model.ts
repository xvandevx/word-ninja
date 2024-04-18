import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey, BelongsToMany,
} from 'sequelize-typescript';
import {CategoryInterface} from "../../../types/sentences/categorys";
import {Users} from "../../users/users.model";
import {Sentence} from "../sentense/sentence.model";
import {SentenceCategory} from "./sentence-categoy";

@Table({ tableName: 'sentences_category' })
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

  @BelongsToMany(() => Sentence, () => SentenceCategory)
  sentences: Sentence[];
}
