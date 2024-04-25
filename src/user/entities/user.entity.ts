import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {ScoreEntity} from "../../score/entities/score.entity";

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "email"})
    email: string;

    @Column({name: "name"})
    name: string;

    @Column({name: "password"})
    password: string;

    @OneToMany(() => ScoreEntity, (score) => score.userId)
    scores: ScoreEntity[];
}