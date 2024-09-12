import { Module } from '@nestjs/common';
import { OwnersService } from '../services/owners.service';
import { OwnersController } from '../controllers/owners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from '../entities/owner.entity';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the uploads directory
      serveRoot: '/uploads', // URL path where the files will be served
    }),
    TypeOrmModule.forFeature([Owner]),
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
