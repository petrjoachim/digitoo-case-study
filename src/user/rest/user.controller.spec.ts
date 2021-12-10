import { UserController } from './user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    userService = new UserService(undefined, undefined);
    userController = new UserController(userService);
  });

  it('call user service', async () => {
    const spy = jest.spyOn(userService, 'purgeEverything').mockResolvedValue();

    expect(userController.removeEverything()).resolves.not.toThrow();
    expect(spy).toBeCalled();
  });
});
