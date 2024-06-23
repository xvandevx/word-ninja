import {WordStatuses} from "~/types/words/word";

export const WordStatusNames: Record<WordStatuses, string> = {
    [WordStatuses.NewWord]: 'New',
    [WordStatuses.Learning]: 'Learning',
    [WordStatuses.Learned]: 'Learned',
    [WordStatuses.NeedToRepeat]: 'NeedToRepeat',
}
