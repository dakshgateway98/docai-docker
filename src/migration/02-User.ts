import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class User20240306230034 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "fullName",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "addedOn",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "roleId",
                        type: "uuid"
                    },
                    {
                        name: "googleId",
                        type: "varchar"
                    }
                ]
            })
        );


        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                columnNames: ["roleId"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }
}