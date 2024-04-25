import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm"
import {TestEntity} from "../../test/entities/test.entity";

@Entity('CategoryTest')
export class CategoryTestEntity {
    @PrimaryColumn()
    name: string;

    @Column({
        name: "description",
        default: "It is a description for this topic"
    })
    description: string;

    @OneToMany(() => TestEntity, (test) => test.category)
    tests: TestEntity[];
}