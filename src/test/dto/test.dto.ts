import {ApiProperty} from "@nestjs/swagger";
import {ArrayMinSize, IsNotEmpty, ValidateNested} from "class-validator";
import {QuestionDTO} from "../../question/dto/question.dto";

export class TestDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    category: string;

    @ApiProperty({ type: [QuestionDTO] })
    @ArrayMinSize(2,
        {message: "the number of questions in the test must be at least two"}
    )
    @ValidateNested()
    questions: QuestionDTO[];
}
