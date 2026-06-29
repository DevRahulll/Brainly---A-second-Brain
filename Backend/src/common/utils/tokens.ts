import jwt, { type JwtPayload } from "jsonwebtoken";

function generateToken(payload: JwtPayload) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "1h",
    });
}

function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
}

export { generateToken, verifyToken };
