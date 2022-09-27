import { createRequire } from 'module';
import child_process from 'child_process';
function server() {
    return new Promise((resolve, reject) => {
        const child = child_process.fork(createRequire(import.meta.url)('docusaurus'), process.argv.slice(2), {
            stdio: 'inherit'
        }); // for e2e test
        child.on('message', (args) => {
            if (process.send) {
                process.send(args);
            }
        });
        process.on('SIGINT', () => {
            child.kill('SIGINT');
        });
        process.on('SIGTERM', () => {
            child.kill('SIGTERM');
        });
        child.on('exit', (code, signal) => {
            if (signal === 'SIGABRT') {
                process.exit(1);
            }
            else if (code === null) {
                // SIGKILL exit code is null
                console.error(`umi is kill by ${signal}`);
                process.exit(1);
            }
            process.exit(code || 0);
        });
    });
}
export default async function (options) {
    const { port } = options;
    server();
}
