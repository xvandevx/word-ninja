import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum CategoryTypesEnum {
  word = 1,
  sentence = 2
}

export const CategoryTypesList = [
    {name: 'Word', id: CategoryTypesEnum.word}, {name: 'Sentence', id: CategoryTypesEnum.sentence}
]

