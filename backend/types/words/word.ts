export enum WordFields {
    isActive = 'isActive',
    word = 'word',
    comment = 'comment',
    userId = 'userId',
}

export interface WordInterface {
    [WordFields.isActive]: boolean;
    [WordFields.word]: string;
    [WordFields.comment]: string;
    [WordFields.userId]: number;
}

export type GetWord = WordInterface[];
