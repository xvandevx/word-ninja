import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
} from 'sequelize-typescript';
import {Category} from "./category.model";
import {Sentence} from "../sentense/sentence.model";
@Table({ tableName: 'sentences_sentence_category', createdAt: false, updatedAt: false })
export class SentenceCategory extends Model<SentenceCategory> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => Sentence)
    @Column({ type: DataType.INTEGER })
    sentenceId: number;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    categoryId: number;
}
