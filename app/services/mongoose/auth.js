import { BadRequest } from '../../errors/bad request.js';
import { createJWT, createRefreshJWT } from '../../utils/jwt.js';
import { createRefreshToken } from './refresh.js';
import { createToken } from '../../utils/user token.js';
import { Unauthorized } from '../../errors/unauthorized.js';
import { userModel as Users } from "../../api/users/model.js";

const signin = async (req) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest(`Please provide email address and password`);
    }

    const user = await Users.findOne({ email });
    if (!user) {
        throw new Unauthorized(`Invalid credentials`);
    }

    const passwordCorrect = await user.comparePassword(password);
    if (!passwordCorrect) {
        throw new Unauthorized(`Invalid credentials`);
    }

    const token = createJWT({ payload: createToken(user) });

    const refreshToken = createRefreshJWT({ payload: createToken(user) });
    await createRefreshToken({
        refreshToken,
        user: user._id
    })
    
    return { user, refreshToken, token };
}

export { signin };