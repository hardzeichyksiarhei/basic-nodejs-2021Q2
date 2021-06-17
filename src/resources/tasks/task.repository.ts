import { EntityRepository, Repository } from 'typeorm';
import Task from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  createTask(task: Omit<Task, 'id'>) {
    return this.create(task);
  }

  getAllTasksByBoardId(boardId: string) {
    return this.find({ boardId });
  }

  getTaskByBoardIdAndTaskId(boardId: string, taskId: string) {
    return this.findOne({ boardId, id: taskId });
  }

  updateTaskByBoardIdAndTaskId(boardId: string, taskId: string, task: Partial<Task>) {
    return this.update({ boardId, id: taskId }, task);
  }

  deleteTaskByBoardIdAndTaskId(boardId: string, taskId: string) {
    return this.delete({ boardId, id: taskId });
  }
}
