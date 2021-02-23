import { BlogEntry } from './../model/blog-entries.interface';
import { switchMap, map } from 'rxjs/operators';
import { BlogService } from './../service/blog.service';
import { UserService } from './../../user/service/user.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/model/user.interface';

@Injectable()
export class UseIsAuthorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private blogService: BlogService,
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const blogEntryId: number = Number(params.id);
    const user: User = request.user;

    return this.userService.findOne(user.id).pipe(
      switchMap((user: User) =>
        this.blogService.findOne(blogEntryId).pipe(
          map((blogEntry: BlogEntry) => {
            let hasPermission = false;

            if (user.id === blogEntry.author.id) {
              hasPermission = true;
            }

            return user && hasPermission;
          }),
        ),
      ),
    );
  }
}
