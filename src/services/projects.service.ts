import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { Group } from 'src/entities/group.entity';
import { Owner } from 'src/entities/owner.entity';
import { ProjectStatus } from 'src/entities/project-status.entity';
import { TagName } from 'src/entities/tag-name.entity';
import { Status } from 'src/entities/status.entity';
import { Level } from 'src/entities/level.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(Owner)
    private readonly ownersRepository: Repository<Owner>,
    @InjectRepository(ProjectStatus)
    private readonly projectStatusRepository: Repository<ProjectStatus>,
    @InjectRepository(TagName)
    private readonly tagNamesRepository: Repository<TagName>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    let group = createProjectDto.groupName
      ? await this.groupsRepository.findOneBy({
          groupName: createProjectDto.groupName,
        })
      : null;

    if (group === null && createProjectDto.groupName) {
      group = this.groupsRepository.create({
        groupName: createProjectDto.groupName,
      });
      await this.groupsRepository.save(group);
    }

    const owner = createProjectDto.ownerId
      ? await this.ownersRepository.findOneBy({ id: createProjectDto.ownerId })
      : null;
    if (createProjectDto.ownerId && !owner) {
      throw new BadRequestException(
        `Owner with ID ${createProjectDto.ownerId} not found`,
      );
    }

    const projectStatus = createProjectDto.projectStatusId
      ? await this.projectStatusRepository.findOneBy({
          id: createProjectDto.projectStatusId,
        })
      : null;
    if (createProjectDto.projectStatusId && !projectStatus) {
      throw new BadRequestException(
        `Project Status with ID ${createProjectDto.projectStatusId} not found`,
      );
    }

    let tags = [];

    if (createProjectDto.tagNames) {
      tags = await this.tagNamesRepository.find({
        where: {
          tagName: In(createProjectDto.tagNames),
        },
      });

      const existingTagNames = tags.map((tag) => tag.tagName);

      const newTagNames = createProjectDto.tagNames.filter(
        (tagName) => !existingTagNames.includes(tagName),
      );

      if (newTagNames.length > 0) {
        const newTags = newTagNames.map((tagName) =>
          this.tagNamesRepository.create({ tagName }),
        );
        const savedTags = await this.tagNamesRepository.save(newTags);
        tags = [...tags, ...savedTags];
      }
    }
    let levels = [];

    if (createProjectDto.levels) {
      const levelNames = createProjectDto.levels.map(
        (level) => level.levelName,
      );
      levels = await this.levelRepository.find({
        where: {
          levelName: In(levelNames),
        },
      });

      const existingLevelNames = levels.map((level) => level.levelName);

      const newLevels = createProjectDto.levels.filter(
        (level) => !existingLevelNames.includes(level.levelName),
      );

      if (newLevels.length > 0) {
        const newLevelEntities = newLevels.map((level) =>
          this.levelRepository.create({
            levelName: level.levelName,
            colorCode: level.colorCode,
          }),
        );
        const savedLevels = await this.levelRepository.save(newLevelEntities);
        levels = [...levels, ...savedLevels];
      }
    }

    const lastProject = await this.projectsRepository.findOne({
      where: {},
      order: { projectId: 'DESC' },
    });

    let newProjectId = 'CDS 001';
    if (lastProject) {
      const lastId = lastProject.projectId.toString();
      const numericPart = parseInt(lastId.split(' ')[1], 10);
      const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
      newProjectId = `CDS ${nextNumericPart.toString()}`;
    }

    let statuss = [];

    if (createProjectDto.status) {
      const statusNames = createProjectDto.status.map(
        (status) => status.statusName,
      );

      statuss = await this.statusRepository.find({
        where: {
          statusName: In(statusNames),
        },
      });

      const existingStatusNames = statuss.map((status) => status.statusName);
      const newStatuses = createProjectDto.status.filter(
        (status) => !existingStatusNames.includes(status.statusName),
      );
      if (newStatuses.length > 0) {
        const newStatusEntities = newStatuses.map((status) =>
          this.statusRepository.create({
            statusName: status.statusName,
            colourCode: status.colourCode,
          }),
        );
        const savedStatuses =
          await this.statusRepository.save(newStatusEntities);
        statuss = [...statuss, ...savedStatuses];
      }
    }

    const project = this.projectsRepository.create({
      ...createProjectDto,
      projectId: newProjectId,
      tagNames: tags,
      group,
      owner,
      levels,
      projectStatus,
      status: statuss,
    });

    console.log('projecttttttttttttttttt', project);
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({
      relations: [
        'group',
        'owner',
        'levels',
        'projectStatus',
        'tagNames',
        'status',
      ],
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: [
        'group',
        'owner',
        'levels',
        'projectStatus',
        'tagNames',
        'status',
      ],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    let group;
    if (updateProjectDto.groupName) {
      group = await this.groupsRepository.findOne({
        where: { groupName: updateProjectDto.groupName },
      });

      if (!group) {
        group = this.groupsRepository.create({
          groupName: updateProjectDto.groupName,
        });
        await this.groupsRepository.save(group);
      }
    }

    let owner;
    if (updateProjectDto.ownerId) {
      owner = await this.ownersRepository.findOne({
        where: { id: updateProjectDto.ownerId },
      });
      if (!owner) {
        throw new BadRequestException(
          `Owner with ID ${updateProjectDto.ownerId} not found`,
        );
      }
    }

    let projectStatus;
    if (updateProjectDto.projectStatusId) {
      projectStatus = await this.projectStatusRepository.findOne({
        where: { id: updateProjectDto.projectStatusId },
      });
      if (!projectStatus) {
        throw new BadRequestException(
          `Project Status with ID ${updateProjectDto.projectStatusId} not found`,
        );
      }
    }

    let tags = [];

    if (updateProjectDto.tagNames) {
      tags = await this.tagNamesRepository.find({
        where: {
          tagName: In(updateProjectDto.tagNames),
        },
      });

      const existingTagNames = tags.map((tag) => tag.tagName);
      const newTagNames = updateProjectDto.tagNames.filter(
        (tagName) => !existingTagNames.includes(tagName),
      );

      if (newTagNames.length > 0) {
        const newTags = newTagNames.map((tagName) =>
          this.tagNamesRepository.create({ tagName }),
        );
        const savedTags = await this.tagNamesRepository.save(newTags);
        tags = [...tags, ...savedTags];
      }
    }

    let levels = [];

    if (updateProjectDto.levels) {
      const levelNames = updateProjectDto.levels.map(
        (level) => level.levelName,
      );
      levels = await this.levelRepository.find({
        where: {
          levelName: In(levelNames),
        },
      });
      const existingLevelNames = levels.map((level) => level.levelName);
      const { newLevels, updatedLevels } = updateProjectDto.levels.reduce(
        (acc, level) => {
          if (existingLevelNames.includes(level.levelName)) {
            const existingLevel = levels.find(
              (existing) => existing.levelName === level.levelName,
            );
            existingLevel.colorCode = level.colorCode;

            acc.updatedLevels.push(existingLevel);
          } else {
            acc.newLevels.push(level);
          }
          return acc;
        },
        { newLevels: [], updatedLevels: [] },
      );

      if (updatedLevels.length > 0) {
        await this.levelRepository.save(updatedLevels);
      }

      if (newLevels.length > 0) {
        const newLevelEntities = newLevels.map((level) =>
          this.levelRepository.create({
            levelName: level.levelName,
            colorCode: level.colorCode,
            levelOrder: level.levelOrder,
          }),
        );
        const savedLevels = await this.levelRepository.save(newLevelEntities);

        levels = [...levels, ...savedLevels];
      }
    }

    let statuss = [];

    if (updateProjectDto.status) {
      const statusNames = updateProjectDto.status.map(
        (status) => status.statusName,
      );

      statuss = await this.statusRepository.find({
        where: {
          statusName: In(statusNames),
        },
      });

      const existingStatusNames = statuss.map((status) => status.statusName);

      const newStatuses = updateProjectDto.status.filter(
        (status) => !existingStatusNames.includes(status.statusName),
      );

      if (newStatuses.length > 0) {
        const newStatusEntities = newStatuses.map((status) =>
          this.statusRepository.create({
            statusName: status.statusName,
            colourCode: status.colourCode,
          }),
        );

        const savedStatuses =
          await this.statusRepository.save(newStatusEntities);

        statuss = [...statuss, ...savedStatuses];
      }
    }

    const project = await this.projectsRepository.preload({
      id,
      ...updateProjectDto,
      group,
      owner,
      projectStatus,
      levels,
      tagNames: tags,
      status: statuss,
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.projectsRepository.save(project);
  }

  // Delete a Project
  async remove(id: number): Promise<void> {
    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}
