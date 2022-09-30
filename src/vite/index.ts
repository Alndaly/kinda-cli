import { Environement } from './../types/index.js';
import { getVitePlugins } from '../vite/configure/plugins/index.js';
import { UserConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'
import { createServer } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const server = await createServer(
    {
        // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
        configFile: false,
        optimizeDeps: {
            entries: 'index.html'
        },
        base: './',
        mode: 'development',
        root: path.resolve(__dirname, './src'),
        server: {
            port: 1337
        }
    }
)

export const viteServer = (viteConfig?: UserConfig, environment?: Environement) => {
    // 配置文件优先级 webpackConfig > defaultConfigure
    return server
}