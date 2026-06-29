import ApiError from "../../common/utils/api-error.js";
import { generateToken } from "../../common/utils/tokens.js";
import User from "./auth.models.js";
import type { ILoginInput, IRegisterInput, IUser } from "./auth.types.js";

const register = async ({
    fullName,
    email,
    password,
    role = "user",
}: IRegisterInput) => {
    if (!fullName || !email || !password)
        throw ApiError.badRequest("All fields are required");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw ApiError.conflict("Emai already exists");

    const user = await User.create({
        fullName,
        email,
        password,
        role,
    });

    const userObj = user.toObject() as IUser;
    delete userObj.password;

    return user;
};

const login = async ({ email, password }: ILoginInput) => {
    if (!email || !password)
        throw ApiError.badRequest("All fields are required");

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw ApiError.conflict("No user found");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw ApiError.invalidCredentials();

    const token = generateToken({ id: user._id.toString() });

    const userObj = user.toObject() as IUser;
    delete userObj.password;

    return { token, userObj };
};

//@ts-ignore
const getProfile = async (id: string) => {
    const user = User.findById(id);
    if (!user) throw ApiError.conflict("Something went wrong");

    return user;
};

export { register, login, getProfile };
