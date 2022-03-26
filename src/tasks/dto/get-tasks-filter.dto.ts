import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { TaskStatus } from "../enums/task-status.enum";

export class GetTasksFilterDto
{
    @ApiPropertyOptional()
    @IsString()
    readonly search: string;

    @ApiPropertyOptional({ enum: TaskStatus })
    readonly status: TaskStatus;
}
