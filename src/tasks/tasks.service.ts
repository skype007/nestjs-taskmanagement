import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository)
  {

  }

  getTasks(filtersDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filtersDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {

    const task = await this.tasksRepository.findOne(id);

    if (!task){
      throw new NotFoundException('No task found with ID ' + id);
    }

    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async removeTask(id: string): Promise<Task> {

    const task = await this.getTaskById(id);

    return await this.tasksRepository.remove(task);
  }
}
