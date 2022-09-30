import { KindaConfiguration } from './../types/index.js';
import { getWatchOptions, watchHandlers } from './../webpack/configure/watch/index.js';
import webpack from 'webpack';
import { getWebpackConfigure } from '../webpack/index.js';
import { BuildOptions } from '../types/index.js'

export default async function (options: BuildOptions, kindaConfig: KindaConfiguration) {
	const { watch } = options;

	const webpackConfigure = getWebpackConfigure(kindaConfig.webpackConfiguration, 'production')

	const compiler = webpack(webpackConfigure)

	// 注意，这部分是一旦检测到文件更新，就触发重新编译，并不是热更新！
	function buildWithWatch() {
		const watching = compiler.watch(getWatchOptions(), watchHandlers)
		process.on('SIGINT', () => {
			watching.close(() => {
				console.log("\nWebpack compier Watching Ended.");
			});
			process.exit(1)
		});
	}

	function build() {
		compiler.run((err: any, stats: any) => {
			if (err) {
				console.error(err.stack || err);
				if (err.details) {
					console.error(err.details);
				}
				return;
			}
			const info = stats.toJson();

			if (stats.hasErrors()) {
				console.error(info.errors);
			}

			if (stats.hasWarnings()) {
				console.warn(info.warnings);
			}

			compiler.close((closeErr) => {
				closeErr && console.log(closeErr)
				process.exit(1)
			});
		});
	}

	if (watch) {
		buildWithWatch();
	} else {
		build()
	}
}
