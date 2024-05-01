import {WordStatuses} from "~/types/words/word";

export const WordStatusNames: Record<WordStatuses, string> = {
    [WordStatuses.NewWord]: 'New word',
    [WordStatuses.Learning]: 'Word learned',
    [WordStatuses.Learned]: 'Learning',
    [WordStatuses.RepeatingMonth]: 'Repeat in mouth',
    [WordStatuses.RepeatedMonth]: 'Repeated after 1 month',
    [WordStatuses.RepeatingSixMonth]: 'Repeat in 6 mouth',
    [WordStatuses.RepeatedSixMonth]: 'Repeated after 6 month',
    [WordStatuses.RepeatingYear]: 'Repeat in year',
    [WordStatuses.RepeatedYear]: 'Repeated in year',
}
