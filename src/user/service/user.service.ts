import { User } from './../model/user.interface';
import { UserEntity } from './../model/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepoitory: Repository<UserEntity>,
  ) {}

  create(user: User): Observable<User> {
    return from(this.userRepoitory.save(user));
  }

  findOne(id: number): Observable<User> {
    return from(this.userRepoitory.findOne({ id }));
  }

  findAll(): Observable<User[]> {
    return from(this.userRepoitory.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepoitory.delete(id));
  }

  updateOne(id: number, user: User): Observable<any> {
    return from(this.userRepoitory.update(id, user));
  }
}
