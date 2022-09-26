import spawn from 'cross-spawn';
function server() {
    return new Promise((resolve, reject) => {
        // Spawn NPM asynchronously
        const command = 'webpack';
        const args = [''];
        const child = spawn(command, args, {
            stdio: 'inherit',
        });
        child.on('close', (code) => {
            console.log('code:', code);
            if (code !== 0) {
                reject({
                    command: `${command} ${args}`,
                });
                return;
            }
            resolve(null);
        });
    });
}
export default async function (options) {
    const { port } = options;
    server();
}
