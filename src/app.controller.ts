import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserInputDto } from './dto/create-user.input.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(@Body() body: CreateUserInputDto) {
    return await this.appService.createUser(body);
  }
}
