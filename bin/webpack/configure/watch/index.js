export const getWatchOptions = () => {
    // 监听配置
    const watchOptions = {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/,
        'info-verbose': 'verbose',
        progress: true, // 在运行 webpack 时，通过使用 --progress 标志，来验证文件修改后，是否没有通知 webpack。如果进度显示保存，但没有输出文件，则可能是配置问题，而不是文件监视问题。
    };
    return watchOptions;
};
export const watchHandlers = (err, stats) => {
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
};
