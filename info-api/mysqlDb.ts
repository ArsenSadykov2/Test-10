import myslq, {Connection} from "mysql2/promise";

let connection: Connection;

const mysqlDb = {
    async init() {
        connection = await myslq.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'Test-10'
        });
    },
    async getConnection() {
        return connection;
    }
}
export default mysqlDb;
