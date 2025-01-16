import { ApiProperty } from '@nestjs/swagger';
import { ExerciseAPI } from '../interface/exercises.interface';
import { CreateExerciseDto } from './create-exercise.dto';

export class GetExercisesDto implements ExerciseAPI {
  @ApiProperty()
  hasNext?: boolean;

  @ApiProperty({ type: () => [CreateExerciseDto] })
  items: CreateExerciseDto[];
}
