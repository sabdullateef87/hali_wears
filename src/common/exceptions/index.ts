

import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
    constructor(message: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
        super(
            {
                statusCode,
                message,
                timestamp: new Date().toISOString(),
            },
            statusCode,
        );
    }
}
