import { UserEntity } from './model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
