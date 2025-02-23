import {DataSource} from 'typeorm'
import * as dotenv from 'dotenv';

dotenv.config()

const dbPassword = String(process.env.DB_PASSWORD || "").trim();  

const datasource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: dbPassword,
});

(async () => {
    let queryRunner;
    try {
        await datasource.initialize().then(()=> {console.log("Datasource initialized setup")})
        queryRunner = datasource.createQueryRunner();
        await queryRunner.createDatabase(process.env.DB_NAME as string, true)
        console.log('Created database')
        queryRunner?.release()
        process.exit();
    } catch (error) {
        console.error({msg: 'Database creation error!!', data:  error})
        queryRunner?.release()
        process.exit();
    }
})()