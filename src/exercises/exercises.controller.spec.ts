import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { Observable, of } from 'rxjs';
import { Exercise, ExerciseAPI } from './interface/exercises.interface';
import { ExercisesRepository } from './repository/exercises.repository';
import { ParamQueryId } from 'src/utils/interfaces/query.interface';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { CreateExerciseDto } from './dto/create-exercise.dto';

describe('ExercisesController', () => {
  let controller: ExercisesController;
  let service: ExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExercisesController],
      providers: [ExercisesService, ExercisesRepository],
    }).compile();

    controller = module.get<ExercisesController>(ExercisesController);
    service = module.get<ExercisesService>(ExercisesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new exercise', () => {
      const newExercise: CreateExerciseDto = {
        description: 'Squat',
      };

      const expectedResult: Observable<Exercise> = of({
        id: '1',
        ...newExercise,
      });

      jest.spyOn(service, 'insert').mockReturnValue(expectedResult);

      const result = controller.create(newExercise);

      expect(result).toBe(expectedResult);
      expect(service.insert).toHaveBeenCalledWith(newExercise);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should return an array of exercises based on query parameters', () => {
      const query = {
        search: 'Push-up',
        filter: '',
        page: '1',
        pageSize: '10',
      };

      const expectedResult: Observable<ExerciseAPI> = of({
        items: [
          {
            id: '1',
            description: 'Push-up',
          },
        ],
      });

      jest.spyOn(service, 'findAll').mockImplementation(() => expectedResult);

      const result = controller.findAll(query);

      expect(result).toBe(expectedResult);
    });

    it('should handle empty query parameters and call service with defaults', () => {
      const query = {};
      const expectedResult: Observable<ExerciseAPI> = of({
        items: [],
      });

      jest.spyOn(service, 'findAll').mockReturnValue(expectedResult);

      const result = controller.findAll(query as any);

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(
        undefined,
        undefined,
        undefined,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single exercise by ID', () => {
      const params: ParamQueryId = { id: '1' };

      const expectedResult: Observable<Exercise> = of({
        id: '1',
        description: 'Pull-up',
      });

      jest.spyOn(service, 'findOne').mockReturnValue(expectedResult);

      const result = controller.findOne(params);

      expect(result).toBe(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update an existing exercise', () => {
      const params: ParamQueryId = { id: '1' };
      const updatedExercise: UpdateExerciseDto = {
        description: 'Updated Push-up',
      };

      const expectedResult: Observable<Exercise> = of({
        id: '1',
        ...updatedExercise,
      });

      jest.spyOn(service, 'update').mockReturnValue(expectedResult);

      const result = controller.update(params, updatedExercise);

      expect(result).toBe(expectedResult);
      expect(service.update).toHaveBeenCalledWith('1', updatedExercise);
    });
  });

  describe('delete', () => {
    it('should delete an exercise by ID', () => {
      const params: ParamQueryId = { id: '1' };

      const expectedResult = true;

      jest.spyOn(service, 'delete').mockReturnValue(expectedResult);

      const result = controller.delete(params);

      expect(result).toBe(expectedResult);
      expect(service.delete).toHaveBeenCalledWith('1');
    });
  });
});
