import { getWatchOptions, watchHandlers } from './../webpack/configure/watch/index.js';
import webpack from 'webpack';
import { getWebpackConfigure } from '../webpack/index.js';
export default async function (options, kindaConfig) {
    const { watch } = options;
    const webpackConfigure = getWebpackConfigure(kindaConfig.webpackConfiguration, 'production');
    const compiler = webpack(webpackConfigure);
    // 注意，这部分是一旦检测到文件更新，就触发重新编译，并不是热更新！
    function buildWithWatch() {
        const watching = compiler.watch(getWatchOptions(), watchHandlers);
        process.on('SIGINT', () => {
            watching.close(() => {
                console.log("\nWebpack compier Watching Ended.");
            });
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
                console.error(info.errors);
            }
            if (stats.hasWarnings()) {
                console.warn(info.warnings);
            }
            compiler.close((closeErr) => {
                console.log(closeErr);
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
