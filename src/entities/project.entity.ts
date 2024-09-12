import { Group } from 'src/entities/group.entity';
import { Level } from 'src/entities/level.entity';
import { Owner } from 'src/entities/owner.entity';
import { ProjectStatus } from 'src/entities/project-status.entity';
import { Status } from 'src/entities/status.entity';
import { TagName } from 'src/entities/tag-name.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  projectName: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: 50 })
  tasksPercentage: number;

  @Column({ nullable: false })
  projectId: string;

  @Column({ default: false })
  roleUp: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  projectAccess: string;

  @Column({ default: false })
  document: boolean;

  @Column({ default: false })
  timeSheet: boolean;

  @Column({ default: false })
  subtask: boolean;

  @Column({ default: false })
  dependency: boolean;

  @Column({ default: false })
  statusTimeline: boolean;

  @Column({ default: false })
  activityStream: boolean;

  @ManyToOne(() => Group, (group) => group.projects)
  group: Group;

  @ManyToOne(() => Owner, (owner) => owner.projects)
  owner: Owner;

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

  @ManyToMany(() => Level, (level) => level.projects)
  @JoinTable()
  levels: Level[];

  @ManyToMany(() => Status, (status) => status.projects, {
    cascade: true,
  })
  @JoinTable()
  status: Status[];

  @ManyToOne(() => ProjectStatus, (projectStatus) => projectStatus.projects)
  projectStatus: ProjectStatus;

  @ManyToMany(() => TagName, (tagName) => tagName.projects)
  @JoinTable()
  tagNames: TagName[];

  @Column({ default: 'Bala' })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ nullable: true })
  deletedBy: string;
}
