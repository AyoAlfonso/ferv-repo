import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@utils/logger';

export interface HttpExceptionWithBody extends HttpException {
  body: any;
}

const errorMiddleware = (error: HttpExceptionWithBody, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error?.body || error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default errorMiddleware;
