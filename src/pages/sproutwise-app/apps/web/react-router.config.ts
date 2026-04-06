import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: true,
	prerender: ['/*?'],
	/** Avoid lazy route discovery quirks in dev (styles / route timing). */
	routeDiscovery: { mode: 'initial' },
} satisfies Config;
