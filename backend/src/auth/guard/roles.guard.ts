import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs/internal/Observable';
import { Roles } from '../decorators/roles.decorator';

import { Express } from 'express';
import { User } from '../../../generated/prisma';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;
    const req: Express & { user: User } = context.switchToHttp().getRequest();

    const user = req.user;

    return roles.includes(user.role);
  }
}
