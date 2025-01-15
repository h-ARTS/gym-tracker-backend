import { ExerciseAPI } from '../interface/exercises.interface';
import { CreateExercisseDto } from './create-exercises.dto';

export class GetExercises implements ExerciseAPI {
  hasNext?: boolean;

  items: CreateExercisseDto[];
}
