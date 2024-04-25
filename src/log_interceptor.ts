import {CallHandler, ExecutionContext, Injectable, NestInterceptor,} from '@nestjs/common';
import {Observable, tap} from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const start = performance.now();
        return next.handle().pipe(
            tap((data) => {
                const response = context.switchToHttp().getResponse();
                const end = performance.now();
                response.cookie('server-loading-time', (end - start).toString());
                return data;
            }),
        );
    }
}