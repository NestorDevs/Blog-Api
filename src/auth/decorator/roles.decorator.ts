import { SetMetadata } from '@nestjs/common';

export const hashRoles = (...hashRoles: string[]) =>
  SetMetadata('roles', hashRoles);
