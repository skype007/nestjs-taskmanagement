import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../enums/task-status.enum";

export class GetTaskByIdDto{

    constructor(){}

    @ApiProperty({
        type: String,
        description: "GUID (UUID) of the task"
    })
    id: string;

    @ApiProperty({
        type: String,
        description: "Title of the task"
    })
    title: string;

    @ApiProperty({
        type: String,
        description: "Label (description) of the task"
    })
    description: string;

    @ApiProperty()
    status: TaskStatus;
}
