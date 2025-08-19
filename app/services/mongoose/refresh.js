import { createJWT, createRefreshJWT, tokenValid } from "../../utils/jwt.js";
import { createToken } from "../../utils/user token.js";
import { NotFound } from "../../errors/not found.js";
import { refreshTokenModel as refreshTokens } from "../../api/refresh/model.js";
import { userModel as Users } from "../../api/users/model.js";

const createRefreshToken = async ({ refreshToken, user }) => {
    return await refreshTokens.findOneAndUpdate(
        { user },
        { refreshToken },
        { upsert: true, new: true }
    )
}

const getUserRefreshToken = async (req) => {
    const { refreshToken } = req.params;
    const result = await refreshTokens.findOne({ refreshToken });
    if (!result) {
        throw new NotFound('Refresh token is not valid');
    }

    await refreshTokens.deleteOne({ refreshToken: result.refreshToken });

    const payload = tokenValid({ token: result.refreshToken });
    const userCheck = await Users.findOne({ email: payload.email });
    const token = createJWT({ payload: createToken(userCheck) });
    const newRefreshToken = createRefreshJWT({ payload: createToken(userCheck) });

    await createRefreshToken({
        refreshToken: newRefreshToken,
        user: result.user
    })

    return { token, refreshToken: newRefreshToken };
}

export { createRefreshToken, getUserRefreshToken };