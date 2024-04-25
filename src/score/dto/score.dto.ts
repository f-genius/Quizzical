import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class ScoreDTO {
    @ApiProperty()
    id: number;

    @ApiProperty({
        default: 0,
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    value: number;

    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    testId: number;
}