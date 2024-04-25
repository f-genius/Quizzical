import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {TestEntity} from "../../test/entities/test.entity";
import {UserEntity} from "../../user/entities/user.entity";

@Entity('Scores')
export class ScoreEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.scores)
    userId: number;

    @ManyToOne(() => TestEntity)
    @JoinColumn()
    testId: number;

    @Column({name: "value"})
    value: number;
}