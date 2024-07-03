import { Database } from '../configs/Database';
import { RolesSeeder } from './01-Roles';


(async () => {
    await Database.getInstance().initialize();
    const datasource = Database.getInstance();

    console.log("Seeder Running...")
    await RolesSeeder.run(datasource)
    process.exit(0)
})();