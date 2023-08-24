import { NextFunction, Request, Response } from 'express';
export declare function RequestHandler(event: (req: Request, res: Response, next: NextFunction) => Promise<any>): (req: Request, res: Response, next: NextFunction) => Promise<any>;
