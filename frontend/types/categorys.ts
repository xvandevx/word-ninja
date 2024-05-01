export enum CategoryFields {
    isActive = 'isActive',
    name = 'name',
    userId = 'userId',
    type = 'type',
}

export interface CategoryInterface {
    [CategoryFields.isActive]: boolean;
    [CategoryFields.name]: string;
    [CategoryFields.userId]: number;
    [CategoryFields.type]: number;
}

export type GetCategory = CategoryInterface[];