import { Injectable } from '@nestjs/common';
import { exercises } from '../db/exercises.data';
import { Exercise, ExerciseAPI } from '../interface/exercises.interface';
import { Observable, of } from 'rxjs';
import { getCollection, getItem } from 'src/utils/utils';

@Injectable()
export class ExercisesRepository {
  exercises = exercises;

  findAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<ExerciseAPI> {
    const desc = true;
    return of(getCollection(this.exercises, search, page, pageSize, desc));
  }

  findOne(id: string): Observable<Exercise> {
    return of(getItem(id, this.exercises));
  }
}
