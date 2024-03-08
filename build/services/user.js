"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../lib/db");
const JWT_SECRET = "$up3rM@N@123";
class UserService {
    // create a new user
    static createUser(payload) {
        const { firstName, lastName, email, password } = payload;
        return db_1.prisma.user.create({
            data: {
                firstName,
                lastName,
                password,
                email
            }
        });
    }
    // find a user by email
    static getUserByEmail(email) {
        return db_1.prisma.user.findUnique({ where: { email } });
    }
    // geterate user token
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield UserService.getUserByEmail(email);
            if (!user)
                throw new Error("User not found!");
            // Get Token
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email
            }, JWT_SECRET);
            return token;
        });
    }
    // Verify user token
    static verifyUserToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(token, JWT_SECRET);
        });
    }
    // get user by id
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.prisma.user.findUnique({ where: { id } });
            if (!user)
                throw new Error("User not found!");
            return user;
        });
    }
}
exports.default = UserService;
