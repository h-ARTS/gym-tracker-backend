import { Collection, Item } from 'src/utils/interfaces/collection.interface';

export type Exercises = Exercise[];

export interface Exercise extends Item {
  description?: string;
}

export interface ExerciseAPI extends Collection {
  items: Exercises;
}
