import { DataSource } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Role } from "../models/Role";

export class RolesSeeder {
    static async run(datasource: DataSource){
        const rolesRepository = datasource.getRepository(Role); 
        const roles = [{
            id: uuidv4(),
            name: 'Doctor'
        },{
            id: uuidv4(),
            name: 'Patient'
        }]
        await rolesRepository.save(roles);
        console.log("Roles have been added successfully");
    }
}