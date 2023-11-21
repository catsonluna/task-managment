import * as argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

function connect() {
    if (typeof prisma === "undefined") {
        prisma = new PrismaClient();
    }
    return prisma;
}

export function getPrisma() {
    return connect();
}

export function dateFormat(date: string) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${day}/${month}/${year}`;
}

export function shaHash(str: string) {
    const crypto = require("crypto");
    const hash = crypto.createHash("sha256");
    hash.update(str);
    return hash.digest("hex");
}

export async function hashPassword(password: string) {
    return await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        hashLength: 64,
    });
}

export async function verifyPassword(hash: string, password: string) {
    return await argon2.verify(hash, password);
}


export function checkEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function checkUsername(username: string) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
}

export function preventSqlInjection(str: any) {
    return str.replace(/'/g, "''");
}

export function generateSecret(len: number) {
    const charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let secret = "";
    for (let i = 0; i < len; i++) {
        secret += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return secret;
}

export async function usernameTaken(username: string){
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });
    return user !== null;
}

export async function emailTaken(email: string){
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user !== null;
}