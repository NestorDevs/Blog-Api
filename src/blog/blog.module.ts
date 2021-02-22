import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { BlogEntryEntity } from './model/blog-entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogEntryEntity]),
    AuthModule,
    UserModule,
  ],
})
export class BlogModule {}
