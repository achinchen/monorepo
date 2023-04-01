import type { AnimalUseCase } from 'server/usecases/animal';
import type {
  AnimalPresenter,
  Payload
} from 'server/adapters/animal/index.presenter';
import { AnimalController } from 'server/adapters/animal/index.controller';
import { ANIMAL_INFO, ANIMAL } from 'spec/mock/constants/animal';
import type { LooseAnimal } from 'server/gateways/animal';

const userId = 456;
const animal = { ...ANIMAL, userId };

let useCase: jest.Mocked<AnimalUseCase>;
let presenter: jest.Mocked<AnimalPresenter>;
let controller: AnimalController;
const mockPresenterResult = {
  success: 200,
  invalidInput: [400],
  forbidden: [403],
  notFound: [404],
  invalidMethod: [405],
  failed: [500]
};

beforeEach(() => {
  useCase = {
    getAnimalInfo: jest.fn(),
    updateAnimal: jest.fn()
  } as unknown as jest.Mocked<AnimalUseCase>;

  presenter = {
    success: jest.fn((payload: Payload['1']) => [
      mockPresenterResult.success,
      payload
    ]),
    forbidden: jest.fn().mockReturnValue(mockPresenterResult.forbidden),
    notFound: jest.fn().mockReturnValue(mockPresenterResult.notFound),
    invalidInput: jest.fn().mockReturnValue(mockPresenterResult.invalidInput),
    failed: jest.fn().mockReturnValue(mockPresenterResult.failed)
  } as unknown as jest.Mocked<AnimalPresenter>;

  controller = new AnimalController(useCase, presenter);
});

describe('getInfo', () => {
  const animalId = ANIMAL_INFO.id;

  describe('when animalId is not provided', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.getInfo(0);
    });

    it('return invalid input', () => {
      expect(payload).toBe(mockPresenterResult.invalidInput);
    });

    it('invoke presenter.invalidInput', () => {
      expect(presenter.invalidInput).toBeCalledTimes(1);
    });

    it('not call usecase', () => {
      expect(useCase.getAnimalInfo).not.toBeCalled();
    });
  });

  describe('when the retrieved result is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.getInfo(animalId, userId);
    });

    it('return notFound', () => {
      expect(payload).toBe(mockPresenterResult.notFound);
    });

    it('invoke presenter.notFound', () => {
      expect(presenter.notFound).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getAnimalInfo).toBeCalledWith(animalId, userId);
    });
  });

  describe('when the retrieved result is truthy', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.getAnimalInfo.mockResolvedValue(ANIMAL_INFO);
      payload = await controller.getInfo(animalId, userId);
    });

    it('return success', () => {
      expect(payload).toEqual([mockPresenterResult.success, ANIMAL_INFO]);
    });

    it('invoke presenter.success', () => {
      expect(presenter.success).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getAnimalInfo).toBeCalledWith(animalId, userId);
    });
  });

  describe('when the get info request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.getAnimalInfo.mockRejectedValue('error');
      payload = await controller.getInfo(animalId, userId);
    });

    it('return failed', () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.getAnimalInfo).toBeCalledWith(animalId, userId);
    });
  });
});

describe('updateAnimal', () => {
  const animalId = animal.id;
  describe('when userId is not provided', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.updateAnimal(animal, undefined!);
    });

    it('return forbidden input', () => {
      expect(payload).toBe(mockPresenterResult.forbidden);
    });

    it('invoke presenter.forbidden', () => {
      expect(presenter.forbidden).toBeCalledTimes(1);
    });

    it('not call usecase', () => {
      expect(useCase.updateAnimal).not.toBeCalled();
    });
  });

  describe('when the payload is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      payload = await controller.updateAnimal({ id: animalId }, userId);
    });

    it('return invalid input', () => {
      expect(payload).toBe(mockPresenterResult.invalidInput);
    });

    it('invoke presenter.invalidInput', () => {
      expect(presenter.invalidInput).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.updateAnimal).not.toBeCalled();
    });
  });

  describe('when the retrieved result is falsy', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.updateAnimal.mockResolvedValue(null);
      payload = await controller.updateAnimal(animal, userId);
    });

    it('return failed', () => {
      expect(payload).toEqual(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.updateAnimal).toBeCalledWith(animal, userId);
    });
  });

  describe('when the retrieved result is truthy', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.updateAnimal.mockResolvedValue(animal);
      payload = await controller.updateAnimal(animal, userId);
    });

    it('return success', () => {
      expect(payload).toEqual([mockPresenterResult.success, animal]);
    });

    it('invoke presenter.success', () => {
      expect(presenter.success).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.updateAnimal).toBeCalledWith(animal, userId);
    });
  });

  describe('when the update request fails', () => {
    let payload: Payload;
    beforeEach(async () => {
      useCase.updateAnimal.mockRejectedValue('error');
      payload = await controller.updateAnimal(animal, userId);
    });

    it('return failed', () => {
      expect(payload).toBe(mockPresenterResult.failed);
    });

    it('invoke presenter.failed', () => {
      expect(presenter.failed).toBeCalledTimes(1);
    });

    it('call usecase', () => {
      expect(useCase.updateAnimal).toBeCalledWith(animal, userId);
    });
  });
});
