import { getWatchOptions, watchHandlers } from './watch/index.js';
import webpack from 'webpack';
import chalk from 'chalk';
import { getWebpackConfiguration } from '../webpack/index.js';
export default async function (options, kindaConfig) {
    const { watch } = options;
    const webpackConfiguration = getWebpackConfiguration(kindaConfig.webpackConfiguration, 'production');
    const compiler = webpack(webpackConfiguration);
    // 注意，这部分是一旦检测到文件更新，就触发重新编译，并不是热更新！
    function buildWithWatch() {
        const watching = compiler.watch(getWatchOptions(), watchHandlers);
        process.on('SIGINT', () => {
            watching.close(() => {
                console.log("\nWebpack compier Watching Ended.");
            });
            process.exit(1);
        });
    }
    function build() {
        compiler.run((err, stats) => {
            if (err) {
                console.error(err.stack || err);
                if (err.details) {
                    console.error(err.details);
                }
                return;
            }
            const info = stats.toJson();
            if (stats.hasErrors()) {
                console.log(``);
                for (let item of info.errors) {
                    console.warn(`${chalk.red(item.message)}`);
                }
            }
            if (stats.hasWarnings()) {
                // console.warn(info.warnings);
                for (let item of info.warnings) {
                    console.warn(`${chalk.yellow(item.message)}`);
                }
            }
            compiler.close((closeErr) => {
                closeErr && console.log(closeErr);
                process.exit(1);
            });
        });
    }
    if (watch) {
        buildWithWatch();
    }
    else {
        build();
    }
}
