import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const statusCode = exception.getStatus();

        switch (statusCode) {
            case 401:
                response.redirect('/login');
                break
            default:
                response.status(statusCode).json({
                    statusCode,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: exception.message
                });
        }
    }
}