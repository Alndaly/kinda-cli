import { getWatchOptions, watchHandlers } from './../webpack/configure/watch/index.js';
import webpack from 'webpack';
import { getWebpackConfigure } from '../webpack/index.js';
const compier = webpack(getWebpackConfigure());
function server() {
    const watching = compier.watch(getWatchOptions(), watchHandlers);
    process.on('SIGINT', () => {
        watching.close(() => {
            console.log("\nWebpack compier Watching Ended.");
        });
    });
}
export default async function (options) {
    const { port } = options;
    server();
}
