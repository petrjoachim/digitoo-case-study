import { Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('/purge/everything')
  @HttpCode(204)
  public async removeEverything(): Promise<void> {
    this.logger.debug('Purging all entries');
    return this.userService.purgeEverything();
  }
}
