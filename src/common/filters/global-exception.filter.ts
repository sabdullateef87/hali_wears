import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from 'src/common/models/dto/response/response';
import { DatabaseException } from '../exceptions';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: number;
        let message: string;
        let errors: string[] = [];

        if (exception instanceof HttpException
            || exception instanceof DatabaseException) {
            status = exception.getStatus();
            message = exception.message;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal Server Error';
            console.error('Unhandled Exception:', exception);
        }

        errors.push(message);
        const apiResponse: ApiResponse<null> = {
            timeStamp: new Date(),
            responseCode: status,
            data: null,
            errors,
        };

        response.status(status).json(apiResponse);
    }
}

