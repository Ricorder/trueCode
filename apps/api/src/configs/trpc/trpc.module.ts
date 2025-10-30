import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { AppContext } from './context';
import { LoggerMiddleware } from './logger.middleware';
import { TrpcPanelController } from './trpc-panel.controller';
// export const SuperJSON = require('fix-esm').require('superjson') as typeof import('superjson');

@Module({
	imports: [
		TRPCModule.forRoot({
			autoSchemaFile: '../web/src/shared/config/trpc/@generated',
			context: AppContext,
			// transformer: SuperJSON,
		}),
	],
	controllers: [TrpcPanelController],
	providers: [AppContext, LoggerMiddleware],
})
export class TrpcModule {}
