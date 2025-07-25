import { Unauthenticated } from '../errors/unauthenticated.js';
import { Unauthorized } from '../errors/unauthorized.js';
import { tokenValid } from '../utils/jwt.js';

const authenticated = async (req, res, next) => {
    try {
        let token;

        const header = req.headers.authorization;
        if (header?.startsWith('Bearer')) {
            token = header.split(' ')[1];
        }

        if (!token) {
            throw new Unauthenticated(`Invalid authentication`);
        }

        const payload = tokenValid({ token });
        req.user = {
            id: payload.userId,
            email: payload.email,
            name: payload.name,
            role: payload.role,
            organizer: payload.organizer
        }

        next();
    } catch (error) {
        next(error);
    }
}

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new Unauthorized(`Unauthorized to access`);
        }
        
        next();
    }
}

export { authenticated, authorize };