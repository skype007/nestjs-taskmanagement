import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { ApiOperation, ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { GetTaskByIdDto } from './dto/get-task-by-id.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
@ApiTags("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiOkResponse({ description: 'Task created successfully', type: Task })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all the tasks' })
  @ApiOkResponse({ description: 'Tasks retrieved successfully', type: [Task] })
  async getAllTasks(@Query() filtersDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.tasksService.getTasks(filtersDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single task' })
  @ApiOkResponse({
    description: 'Task retrieved successfully',
    type: GetTaskByIdDto
  })
  @ApiNotFoundResponse({
    description: 'A task with given id does not exist.'
  })
  async findOne(@Param('id') id: string): Promise<GetTaskByIdDto> {
    const task = await this.tasksService.getTaskById(id);

    const response = new GetTaskByIdDto();
    response.id = task.id;
    response.title = task.title;
    response.description = task.description;
    response.status = task.status;

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single task' })
  @ApiOkResponse({ description: 'Task deleted successfully', type: GetTaskByIdDto })
  @ApiNotFoundResponse({
    description: 'A task with given id does not exist.'
  })
  remove(@Param('id') id: string) {
    return this.tasksService.removeTask(id);
  }
}
