import WebpackBar from 'webpackbar';
export const getWebpackPlugins = () => {
    const plugins = [];
    let progressPlugin = new WebpackBar({
        color: "#85d",
        basic: false,
        profile: false, // 默认false，启用探查器。
    });
    plugins.push(progressPlugin);
    return plugins;
};
