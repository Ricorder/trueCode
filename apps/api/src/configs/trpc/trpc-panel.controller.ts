import { All, Controller, Inject, type OnModuleInit } from '@nestjs/common';
import { AnyRouter } from '@trpc/server';
import { AppRouterHost } from 'nestjs-trpc';
import { renderTrpcPanel } from 'trpc-panel';

@Controller()
export class TrpcPanelController implements OnModuleInit {
	private appRouter!: AnyRouter;

	constructor(
		@Inject(AppRouterHost) private readonly appRouterHost: AppRouterHost,
	) {}
	onModuleInit() {
		this.appRouter = this.appRouterHost.appRouter as AnyRouter;
	}

	@All('/panel')
	panel() {
		return renderTrpcPanel(this.appRouter, {
			url: 'http://localhost:8000/trpc',
		});
	}
}
