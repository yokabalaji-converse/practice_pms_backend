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
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Task, (task) => task.status)
  tasks?: Task[];

  @Column()
  statusName: string;

  @Column()
  colourCode: string;

  @ManyToMany(() => Project, (project) => project.status)
  projects: Project;

  @Column({ type: 'date' })
  createdAt?: Date = new Date();

  @Column({ type: 'date', nullable: true })
  updatedAt?: Date;

  @Column({ type: 'date', nullable: true })
  deletedAt?: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  deletedBy?: string;
}
