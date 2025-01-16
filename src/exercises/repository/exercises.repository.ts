import { Injectable } from '@nestjs/common';
import { exercises } from '../db/exercises.data';
import { Exercise, ExerciseAPI } from '../interface/exercises.interface';
import { Observable, of } from 'rxjs';
import { getCollection, getItem } from '../../utils/utils';
import { randomUUID } from 'crypto';

@Injectable()
export class ExercisesRepository {
  private exercises: Exercise[] = exercises;

  findAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<ExerciseAPI> {
    return of(this.getCollectionWithSearch(search, page, pageSize));
  }

  findOne(id: string): Observable<Exercise> {
    return of(this.getExerciseById(id));
  }

  insert(exercise: Exercise): Observable<Exercise> {
    const id = exercise.id || randomUUID();
    return this.upsert(id, exercise);
  }

  private upsert(id: string, exercise: Exercise): Observable<Exercise> {
    this.exercises = this.exercises.some((item) => item.id === id)
      ? this.exercises.map((item) =>
          item.id === id ? { ...exercise, id } : item,
        )
      : [...this.exercises, { ...exercise, id }];

    return of(this.getExerciseById(id));
  }

  private getCollectionWithSearch(
    search?: string,
    page?: string,
    pageSize?: string,
  ): ExerciseAPI {
    const desc = true;
    return getCollection(this.exercises, search, page, pageSize, desc);
  }

  private getExerciseById(id: string): Exercise {
    return getItem(id, this.exercises);
  }

  update(id: string, exercise: Exercise): Observable<Exercise> {
    return this.upsert(id, exercise);
  }

  delete(id: string): boolean {
    const initialLength = this.exercises.length;
    this.exercises = this.exercises.filter((item) => item.id !== id);
    return this.exercises.length < initialLength;
  }
}
