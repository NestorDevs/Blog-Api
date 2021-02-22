import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { BlogService } from './service/blog.service';
import { BlogEntryEntity } from './model/blog-entry.entity';
import { BlogController } from './controller/blog.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogEntryEntity]),
    AuthModule,
    UserModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
