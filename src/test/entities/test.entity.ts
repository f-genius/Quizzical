import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from "typeorm"
import {CategoryTestEntity} from "../../category-test/entities/category-test.entity";
import {QuestionEntity} from "../../question/entities/question.entity";

@Entity('Tests')
export class TestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "name"})
    name: string;

    @ManyToOne( () => CategoryTestEntity, (category: { tests: any; }) => category.tests)
    @JoinColumn({name: "category"})
    category: CategoryTestEntity;

    @OneToMany(() => QuestionEntity, (question) => question.testId)
    questions: QuestionEntity[];
}