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
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetExercisesDto } from './dto/get-exercises.dto';

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @ApiResponse({ status: 201, type: CreateExerciseDto })
  @Post()
  create(@Body() newExercise: CreateExerciseDto): Observable<Exercise> {
    return this.exercisesService.insert(newExercise);
  }

  @ApiResponse({ status: 200, type: GetExercisesDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  findAll(@Query() query: QueryApi): Observable<ExerciseAPI> {
    const { search, filter, page, pageSize } = query;
    return this.exercisesService.findAll(search || filter, page, pageSize);
  }

  @ApiResponse({ status: 200, type: CreateExerciseDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param() params: ParamQueryId): Observable<Exercise> {
    return this.exercisesService.findOne(params['id']);
  }

  @ApiResponse({ status: 200, type: CreateExerciseDto })
  @ApiParam({ name: 'id' })
  @Put(':id')
  update(
    @Param() params: ParamQueryId,
    @Body() newExercise: UpdateExerciseDto,
  ): Observable<Exercise> {
    return this.exercisesService.update(params['id'], newExercise);
  }

  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  delete(@Param() params: ParamQueryId) {
    return this.exercisesService.delete(params['id']);
  }
}
