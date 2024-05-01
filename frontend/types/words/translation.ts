export enum WordFields {
    isActive = 'isActive',
    translation = 'translation',
    userId = 'userId'
}

export interface TranslationInterface {
    [WordFields.isActive]: boolean;
    [WordFields.translation]: string;
    [WordFields.userId]: number;
}

export type GetTranslation = TranslationInterface[];
