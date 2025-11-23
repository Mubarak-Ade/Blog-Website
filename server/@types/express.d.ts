import { Request } from 'express';
import { AuthUser } from '../src/types/AuthUser.ts';

declare module "express-serve-static-core" {
    interface Request {
        user?: AuthUser
    }
}