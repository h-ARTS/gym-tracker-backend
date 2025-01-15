import { Exercise } from '../interface/exercises.interface';

export class CreateExercisseDto implements Exercise {
  id: string;

  description: string;
}
