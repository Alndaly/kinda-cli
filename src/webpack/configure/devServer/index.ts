import path from 'path'
import type { Configuration } from 'webpack';

export const getDevServer = () => {
    const devServer: Configuration["devServer"] = {
        port: 3001, // 服务启动端口号
        open: false, // 是否自动开启默认浏览器
        hot: true, // 是否开启HMR
        host: 'local-ip', // 指定要使用的 host。如果你想让你的服务器可以被外部访问
        watchFiles: ['src/**/*', 'public/**/*'], // 该配置项允许你配置 globs/directories/files 来监听文件变化。
        allowedHosts: 'auto', // 该选项允许将允许访问开发服务器的服务列入白名单。
        static: {
            publicPath: '/', // 告诉服务器在哪个 URL 上提供 static.directory 的内容。
            directory: path.join(process.cwd(), 'public'), // 告诉服务器从哪里提供内容。只有在你希望提供静态文件时才需要这样做。
            watch: true, //默认启用，文件更改将触发整个页面重新加载。
        },
        server: 'http', // 默认情况下，开发服务器将通过 HTTP 提供服务。可以选择使用 HTTPS 提供服务.
        proxy: {},
        client: {
            logging: 'info',
            overlay: true, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            progress: true, // 在浏览器中以百分比显示编译进度。
            reconnect: 5, // 告诉 dev-server 它应该尝试重新连接客户端的次数。当为 true 时，它将无限次尝试重新连接。
        }
    }
    return devServer
}