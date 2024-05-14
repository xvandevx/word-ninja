import {WordStatuses} from "~/types/words/word";

export const WordStatusNames: Record<WordStatuses, string> = {
    [WordStatuses.NewWord]: 'New word',
    [WordStatuses.Learning]: 'Learning',
    [WordStatuses.Learned]: 'Word learned',
    [WordStatuses.RepeatingMonth]: 'Repeating (after 1 month)',
    [WordStatuses.RepeatedMonth]: 'Repeated (after 1 month)',
    [WordStatuses.RepeatingSixMonth]: 'Repeating (after 6 month)',
    [WordStatuses.RepeatedSixMonth]: 'Repeated (after 6 month)',
    [WordStatuses.RepeatingYear]: 'Repeating (after 1 year)',
    [WordStatuses.FinallyLearned]: 'Finally learned!',
}
