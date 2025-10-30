import { Logger, Module } from '@nestjs/common';
import { StorageService } from './storage.service';

@Module({
	providers: [StorageService, Logger],
	exports: [StorageService],
})
export class StorageModule { }
