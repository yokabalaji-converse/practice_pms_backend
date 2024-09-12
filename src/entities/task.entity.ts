import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from 'src/entities/status.entity';
import { Level } from 'src/entities/level.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column({ type: 'float' })
  taskPercentage: number;

  @ManyToOne(() => Status, (status) => status.tasks)
  status: Status;

  @ManyToOne(() => Level, (level) => level.tasks)
  level: Level;

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
}
