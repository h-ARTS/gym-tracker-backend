import { Exercise } from '../interface/exercises.interface';

export class CreateExerciseDto implements Exercise {
  id: string;

  description: string;
}
