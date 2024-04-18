export enum CategoryFields {
    isActive = 'isActive',
    name = 'name',
    userId = 'userId'
}

export interface CategoryInterface {
    [CategoryFields.isActive]: boolean;
    [CategoryFields.name]: string;
    [CategoryFields.userId]: number;
}

export type GetCategory = CategoryInterface[];