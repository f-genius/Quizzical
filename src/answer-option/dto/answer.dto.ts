import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class AnswerDto {
    @ApiProperty()
    @IsNotEmpty()
    text: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isRight: boolean;

    @ApiProperty({ default: 0 })
    @IsNotEmpty()
    @IsPositive({message: "points must be positive"})
    points: number;
}