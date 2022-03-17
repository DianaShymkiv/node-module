import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

// name of the table in which we reference
@Entity('Users', {database: 'root'})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'varchar',
        width:250,
        nullable: false
    })
    firstName: string;

    @Column({
        type:'varchar',
        width:250,
        nullable: false
    })
    lastName: string;
}