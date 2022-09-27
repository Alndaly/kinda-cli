export const getWatchOptions = () => {
    // 监听配置
    const watchOptions = {
        aggregateTimeout: 300, //当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：
        poll: 1000, //通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
        ignored: /node_modules/, //对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，例如 node_modules：
        'info-verbose': 'verbose',  //控制生命周期消息的详细程度，例如 Started watching files(开始监听文件)... 日志。将 info-verbosity 设置为 verbose，还会额外在增量构建的开始和结束时，向控制台发送消息。info-verbosity 默认设置为 info。
        progress: true, // 在运行 webpack 时，通过使用 --progress 标志，来验证文件修改后，是否没有通知 webpack。如果进度显示保存，但没有输出文件，则可能是配置问题，而不是文件监视问题。
    }
    return watchOptions
}

export const watchHandlers = (err: any, stats: any) => {
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
    // console.log('stats:', stat);
}