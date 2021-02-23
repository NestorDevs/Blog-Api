import { UseIsAuthorGuard } from './../guards/user-is-author.guard';
import { BlogEntry } from './../model/blog-entries.interface';
import { JwtAuthGuard } from './../../auth/guards/jwt-guard';
import { Observable } from 'rxjs';
import { BlogService } from './../service/blog.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() blogEntry: BlogEntry, @Request() req): Observable<BlogEntry> {
    const user = req.user;
    return this.blogService.create(user, blogEntry);
  }

  @Get()
  findBlogEntries(@Query('userId') userId: number): Observable<BlogEntry[]> {
    if (userId == null) {
      return this.blogService.findAll();
    } else {
      return this.blogService.findByUser(userId);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<BlogEntry> {
    return this.blogService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, UseIsAuthorGuard)
  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() blogEntry: BlogEntry,
  ): Observable<BlogEntry> {
    return this.blogService.updateOne(Number(id), blogEntry);
  }

  @UseGuards(JwtAuthGuard, UseIsAuthorGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.blogService.deleteOne(id);
  }
}
