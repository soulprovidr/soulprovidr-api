import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const { method, originalUrl } = req;
          const { statusCode } = res;
          this.logger.log(
            `[${method}] ${originalUrl} ${statusCode} ${Date.now() - now}ms`,
          );
        },
      }),
    );
  }
}
