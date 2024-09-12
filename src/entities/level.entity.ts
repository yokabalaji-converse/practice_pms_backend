import { Project } from 'src/entities/project.entity';
import { Task } from 'src/entities/task.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  levelName: string;

  @Column()
  colorCode: string;

  @Column({ default: 1 })
  levelOrder: string;

  @Column({ type: 'date' })
  createdAt: Date = new Date();
  @Column({ type: 'date', nullable: true })
  updatedAt: Date;

  @Column({ type: 'date', nullable: true })
  deletedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ nullable: true })
  deletedBy: string;

  @OneToMany(() => Task, (task) => task.level)
  tasks: Task[];

  @ManyToMany(() => Project, (project) => project.levels)
  projects: Project;
}
