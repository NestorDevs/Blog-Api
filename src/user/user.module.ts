import { AuthModule } from './../auth/auth.module';
import { UserEntity } from './model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
