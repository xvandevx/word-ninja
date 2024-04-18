export enum WordFields {
    isActive = 'isActive',
    word = 'word',
    userId = 'userId',
}

export interface WordInterface {
    [WordFields.isActive]: boolean;
    [WordFields.word]: string;
    [WordFields.userId]: number;
}

export type GetWord = WordInterface[];
