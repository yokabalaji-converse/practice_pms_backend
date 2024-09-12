import { Project } from 'src/entities/project.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TagName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagName: string;

  @ManyToMany(() => Project, (project) => project.tagNames)
  projects: Project[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdBy: string;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  deletedBy: string;

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
}
