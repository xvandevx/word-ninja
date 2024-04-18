import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey, BelongsToMany,
} from 'sequelize-typescript';
import {Users} from "../../users/users.model";
import {TranslationInterface} from "../../../types/words/translation";
import {Word} from "../word/word.model";
import {WordTranslation} from "./word-translation";

@Table({ tableName: 'words_translation' })
export class Translation extends Model<Translation, TranslationInterface> {
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
  translation: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsToMany(() => Word, () => WordTranslation)
  words: Word[];
}
