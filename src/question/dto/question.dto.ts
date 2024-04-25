import {ApiProperty} from "@nestjs/swagger";
import {ARRAY_MIN_SIZE, ArrayMinSize, IsNotEmpty, ValidateNested} from "class-validator";
import {AnswerDto} from "../../answer-option/dto/answer.dto";

export class QuestionDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    text: string;

    @ApiProperty({ type: [AnswerDto] })
    @ArrayMinSize(2,
        {message: "the number of possible answers to a question must be at least two"}
    )
    @ValidateNested()
    answers: AnswerDto[];
}
