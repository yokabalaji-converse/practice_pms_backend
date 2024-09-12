import { Project } from 'src/entities/project.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProjectStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  statusName: string;

  @Column()
  colourCode: string;

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

  @OneToMany(() => Project, (project) => project.projectStatus)
  projects: Project[];
}
