import mysql from "mysql2";

export const connection = mysql.createConnection({
    host: "65.21.149.235",
    user: "task_admin",
    password: "task_password",
    database: "task_managment",
    port: 3306
})