import {DataSource} from 'typeorm'
import * as dotenv from 'dotenv';

dotenv.config()

const datasource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    database: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD || process.env.DB_PASS,
});

(async () => {
    let queryRunner;
    try {
        await datasource.initialize().then(()=> {console.log("Datasource initialized")})
        queryRunner = datasource.createQueryRunner();
        await queryRunner.dropDatabase(process.env.DB_NAME as string, true)
        console.log('Deleted database')
        queryRunner?.release()
        process.exit();
    } catch (error) {
        console.error({msg: 'Error deleting database!!', data: error})
        queryRunner?.release()
        process.exit();
    }
})()