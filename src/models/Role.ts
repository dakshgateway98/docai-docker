import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity({name: 'roles'})
export class Role extends BaseEntity{
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;
}