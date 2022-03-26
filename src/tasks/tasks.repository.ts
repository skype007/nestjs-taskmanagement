import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enums/task-status.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

    getTasks(filtersDto: GetTasksFilterDto): Promise<Task[]> {
        const query = this.createQueryBuilder('task');

        const { status, search } = filtersDto;

        if (status){
            query.andWhere('task.status = :status', { status });
        }

        if (search){
            query.andWhere(
                'task.title LIKE :search OR task.description LIKE :search',
                { search: `%${search}%`},)
        }

        return query.getMany();
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {

        const { title, description } = createTaskDto;
    
        // const task = this.create({
        //   title,
        //   description,
        //   status: TaskStatus.OPEN,
        // });

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        const result = await this.createQueryBuilder()
            .insert()
            .into(Task)
            .values({...task})
            .execute();
            
        // await this.save(task);

        const { id: taskGeneratedId } = result.generatedMaps[0];

        task.id = taskGeneratedId;
        console.log(result);

        return task;
      }
}
