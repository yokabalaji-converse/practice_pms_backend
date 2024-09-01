import { Group } from 'src/groups/entities/group.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Owner } from 'src/owners/entities/owner.entity';
import { Status } from 'src/status/entities/status.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;

  @Column({ unique: true })
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description: string;

  @Column()
  projectAccess: string;

  @Column()
  statuss: string;

  @Column()
  tagName: string;

  @Column()
  document: boolean;

  @Column()
  timeSheet: boolean;

  @Column()
  subtask: boolean;

  @Column()
  dependency: boolean;

  @Column()
  statusTimeline: boolean;

  @Column()
  activityStream: boolean;

  @ManyToOne(() => Group, (group) => group.projects)
  group: Group;

  @ManyToOne(() => Owner, (owner) => owner.projects)
  owner: Owner;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Level, (level) => level.project)
  levels: Level[];

  @OneToOne(() => Status)
  @JoinColumn()
  status: Status;
}
