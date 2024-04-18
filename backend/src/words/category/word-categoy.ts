import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
} from 'sequelize-typescript';
import {Word} from "../word/word.model";
import {Category} from "./category.model";
@Table({ tableName: 'words_word_category', createdAt: false, updatedAt: false })
export class WordCategory extends Model<WordCategory> {
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

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    categoryId: number;
}
