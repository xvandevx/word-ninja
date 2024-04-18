import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
} from 'sequelize-typescript';
import {Translation} from "./translation.model";
import {Word} from "../word/word.model";
@Table({ tableName: 'words_word_translation', createdAt: false, updatedAt: false })
export class WordTranslation extends Model<WordTranslation> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => Word)
    @Column({ type: DataType.INTEGER })
    wordId: number;

    @ForeignKey(() => Translation)
    @Column({ type: DataType.INTEGER })
    translationId: number;
}
