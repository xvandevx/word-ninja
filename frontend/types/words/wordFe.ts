import {WordStatuses} from "~/types/words/word";

export const WordStatusNames: Record<WordStatuses, string> = {
    [WordStatuses.NewWord]: 'New word',
    [WordStatuses.Learning]: 'Learning',
    [WordStatuses.Learned]: 'Word learned',
    [WordStatuses.RepeatingMouth]: 'Repeating (after 1 month)',
    [WordStatuses.RepeatedMount]: 'Repeated (after 1 month)',
    [WordStatuses.RepeatingSixMouth]: 'Repeating (after 6 month)',
    [WordStatuses.RepeatedSixMount]: 'Repeated (after 6 month)',
    [WordStatuses.RepeatingYear]: 'Repeating (after 1 year)',
    [WordStatuses.RepeatedYear]: 'Finally learned!',
}
