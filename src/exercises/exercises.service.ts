import { Injectable } from '@nestjs/common';
import { ExercisesRepository } from './repository/exercises.repository';
import { Observable } from 'rxjs';
import { Exercise, ExerciseAPI } from './interface/exercises.interface';

@Injectable()
export class ExercisesService {
  constructor(private exerciseRepository: ExercisesRepository) {}

  findAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<ExerciseAPI> {
    return this.exerciseRepository.findAll(search, page, pageSize);
  }

  findOne(id: string): Observable<Exercise> {
    return this.exerciseRepository.findOne(id);
  }

  insert(exercise: Exercise) {
    return this.exerciseRepository.insert(exercise);
  }

  update(id: string, exercise: Exercise) {
    return this.exerciseRepository.update(id, exercise);
  }

  delete(id: string) {
    return this.exerciseRepository.delete(id);
  }
}
