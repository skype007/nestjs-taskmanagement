import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateTaskDto
{
    @ApiProperty()
    @IsString()
    readonly title: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    readonly description?: string | null;
}
