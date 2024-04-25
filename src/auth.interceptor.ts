import {CallHandler, ExecutionContext, Injectable, NestInterceptor,} from '@nestjs/common';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler) {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        let cookies = req.headers['cookie']
        console.log(cookies)
        let is_auth = false

        if (cookies != undefined) {
            cookies = cookies.split(';')
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const [name, value] = cookie.split('=');

                if (name === 'token') {
                    is_auth = true
                }
            }
        }
        console.log(is_auth)
        return next.handle().pipe(
            map((data) => ({
                ...data,
                is_auth: is_auth,
            })),
        );
    }
}