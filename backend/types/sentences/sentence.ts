export enum SentenceFields {
    isActive = 'isActive',
    sentence = 'sentence',
    translation = 'translation',
    comment = 'comment',
    userId = 'userId'
}

export interface SentenceInterface {
    [SentenceFields.isActive]: boolean;
    [SentenceFields.sentence]: string;
    [SentenceFields.translation]: string;
    [SentenceFields.comment]: string;
    [SentenceFields.userId]: number;
}

export type GetSentence = SentenceInterface[];
