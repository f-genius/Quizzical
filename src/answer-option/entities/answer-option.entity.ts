import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {QuestionEntity} from "../../question/entities/question.entity";

@Entity('Answers')
export class AnswerOptionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name :"text"})
    text: string;

    @Column({name: "isRight"})
    isRight: boolean;

    @Column({name: "points", default: 0, })
    points: number;

    @ManyToOne(() => QuestionEntity, (question) => question.answers)
    question: number;
}