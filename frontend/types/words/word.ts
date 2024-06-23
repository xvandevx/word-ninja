export enum WordFields {
    isActive = 'isActive',
    word = 'word',
    translation = 'translation',
    pluses = 'pluses',
    minuses = 'minuses',
    status = 'status',
    learnCount = 'learnCount',
    lastStatusDate = 'lastStatusDate',
    comment = 'comment',
    userId = 'userId',
}

export interface WordInterface {
    [WordFields.isActive]: boolean;
    [WordFields.word]: string;
    [WordFields.translation]: string;
    [WordFields.pluses]: number;
    [WordFields.minuses]: number;
    [WordFields.status]: WordStatuses;
    [WordFields.learnCount]: number;
    [WordFields.lastStatusDate]: string;
    [WordFields.comment]: string;
    [WordFields.userId]: number;
}

export type GetWord = WordInterface[];

export enum WordStatuses {
    'NewWord',
    'Learning',
    'Learned',
    'NeedToRepeat',
}