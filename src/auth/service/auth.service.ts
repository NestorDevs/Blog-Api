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

  comparePasswords(newPassword: string, passwortHash: string): Observable<any> {
    return from(bcrypt.compare(newPassword, passwortHash));
  }
}
