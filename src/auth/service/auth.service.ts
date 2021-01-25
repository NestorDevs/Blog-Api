import { Observable, from, of } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/model/user.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtServices: JwtService) {}

  generateJWT(user: User): Observable<string> {
    return from(this.jwtServices.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePassword(
    newPassword: string,
    passwordHash: string,
  ): Observable<any | boolean> {
    return from<any | boolean>(bcrypt.compare(newPassword, passwordHash));
  }
}
