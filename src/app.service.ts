import { Injectable, Logger } from '@nestjs/common';
import { CreateUserInputDto } from './dto/create-user.input.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.event';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async createUser(body: CreateUserInputDto) {
    this.logger.log(`Creating user with email: ${body.email}`);
    this.eventEmitter.emit(
      'user.created',
      new UserCreatedEvent('1', body.email),
    );
  }

  @OnEvent('user.created')
  handleUserCreatedEvent(event: UserCreatedEvent) {
    this.logger.log(`User created with id: ${event.id}`);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.logger.log(`Called when the current second is 5 ${new Date()}`);
  }
}
