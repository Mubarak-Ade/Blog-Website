import { Request } from 'express';
import { AuthUser } from '../../types/AuthUser';

declare module "express-serve-static-core" {
    interface Request {
        user?: AuthUser
    }
}