import { ExerciseAPI } from '../interface/exercises.interface';
import { CreateExerciseDto } from './create-exercise.dto';

export class GetExercises implements ExerciseAPI {
  hasNext?: boolean;

  items: CreateExerciseDto[];
}
