import {WordStatuses} from "../words/word";

export enum SentenceFields {
    isActive = 'isActive',
    sentence = 'sentence',
    translation = 'translation',
    pluses = 'pluses',
    minuses = 'minuses',
    status = 'status',
    learnCount = 'learnCount',
    lastStatusDate = 'lastStatusDate',
    comment = 'comment',
    userId = 'userId',
}

export interface SentenceInterface {
    [SentenceFields.isActive]: boolean;
    [SentenceFields.sentence]: string;
    [SentenceFields.translation]: string;
    [SentenceFields.pluses]: number;
    [SentenceFields.minuses]: number;
    [SentenceFields.status]: WordStatuses;
    [SentenceFields.learnCount]: number;
    [SentenceFields.lastStatusDate]: string;
    [SentenceFields.comment]: string;
    [SentenceFields.userId]: number;
}

export type GetSentence = SentenceInterface[];
