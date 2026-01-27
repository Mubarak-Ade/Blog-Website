import { AuthUser } from '../../types/AuthUser.js';
declare module "express-serve-static-core" {
    interface Request {
        user?: AuthUser;
    }
}
//# sourceMappingURL=express.d.ts.map