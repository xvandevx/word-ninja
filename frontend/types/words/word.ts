export enum WordFields {
    isActive = 'isActive',
    word = 'word',
    translation = 'translation',
    pluses = 'pluses',
    minuses = 'minuses',
    status = 'status',
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
    [WordFields.lastStatusDate]: string;
    [WordFields.comment]: string;
    [WordFields.userId]: number;
}

export type GetWord = WordInterface[];

export enum WordStatuses {
    'NewWord',
    'Learning',
    'Learned',
    'RepeatingMonth',
    'RepeatedMonth',
    'RepeatingSixMonth',
    'RepeatedSixMonth',
    'RepeatingYear',
    'FinallyLearned',
}