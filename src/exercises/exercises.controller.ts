import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Observable } from 'rxjs';
import { Exercise, ExerciseAPI } from './interface/exercises.interface';
import { ParamQueryId, QueryApi } from 'src/utils/interfaces/query.interface';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() newExercise: CreateExerciseDto): Observable<Exercise> {
    return this.exercisesService.insert(newExercise);
  }

  @Get()
  findAll(@Query() query: QueryApi): Observable<ExerciseAPI> {
    const { search, filter, page, pageSize } = query;
    return this.exercisesService.findAll(search || filter, page, pageSize);
  }

  @Get(':id')
  findOne(@Param() params: ParamQueryId): Observable<Exercise> {
    return this.exercisesService.findOne(params['id']);
  }

  @Put(':id')
  update(
    @Param() params: ParamQueryId,
    @Body() newExercise: CreateExerciseDto,
  ): Observable<Exercise> {
    return this.exercisesService.update(params['id'], newExercise);
  }

  @Delete(':id')
  delete(@Param() params: ParamQueryId) {
    return this.exercisesService.delete(params['id']);
  }
}
