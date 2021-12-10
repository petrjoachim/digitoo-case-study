import { Controller, HttpCode, Logger, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  @Post('/purge/everything')
  @HttpCode(204)
  public async removeEverything(): Promise<void> {
    this.logger.debug('Purging all entries');
  }
}
