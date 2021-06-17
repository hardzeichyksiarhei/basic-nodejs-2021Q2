import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'tasks' })
class Task {
  @PrimaryColumn()
  id: string = uuid();

  @Column('varchar')
  title: string = 'Task';

  @Column('integer')
  order: number = 0;

  @Column('text')
  description: string = '';

  @Column('varchar', { length: 36, nullable: true })
  userId!: string | null;

  @Column('varchar', { length: 36, nullable: true })
  boardId!: string | null;

  @Column('varchar', { length: 36, nullable: true })
  columnId!: string | null;

  static toResponse(task: Omit<Task, 'id'>) {
    return task;
  }
}

export default Task;
