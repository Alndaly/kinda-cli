import { fileURLToPath } from 'url';
import path from 'path';
import { createServer } from 'vite';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const getRoot = () => {
    const rootPath = path.resolve(path.resolve(), './src');
    return rootPath;
};
export const viteServer = async (viteConfig, environment) => {
    getRoot();
    const server = await createServer({
        // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
        configFile: false,
        optimizeDeps: {
            entries: 'index.html'
        },
        base: './',
        mode: 'development',
        root: getRoot(),
        server: {
            port: 1337
        }
    });
    return server;
};
