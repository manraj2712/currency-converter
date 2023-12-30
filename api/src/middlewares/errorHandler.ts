import { Request, Response, NextFunction } from 'express';

interface JsonErrorHandlerError {
  statusCode?: number;
  message: string;
}

export const ErrorHandler = async (error: JsonErrorHandlerError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode || 500).json({
    error: error.message,
  });
};
