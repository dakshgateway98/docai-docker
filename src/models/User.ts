import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "./Role";

@Entity({name: 'users'})
export class User extends BaseEntity{
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    addedOn: Date;

    @Column({ nullable: true })
    googleId: string;

    @Column()
    roleId: string;

    @ManyToOne(() => Role, role => role.id)
    @JoinColumn({ name: "roleId" })
    role: Role;
}