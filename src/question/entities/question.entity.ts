import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm"
import {AnswerOptionEntity} from "../../answer-option/entities/answer-option.entity";
import {TestEntity} from "../../test/entities/test.entity";

@Entity('Questions')
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "text"})
    text: string;

    @ManyToOne(() => TestEntity, (test) => test.questions)
    testId: number;

    @OneToMany(() => AnswerOptionEntity, (option) => option.question)
    answers: AnswerOptionEntity[]
}