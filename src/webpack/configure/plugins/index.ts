import WebpackBar from 'webpackbar';

export const getWebpackPlugins = () => {
	const plugins = [];
	let progressPlugin = new WebpackBar({
		color: "#85d",  // 默认green，进度条颜色支持HEX
		basic: false,   // 默认true，启用一个简单的日志报告器
		profile: false,  // 默认false，启用探查器。
	});
	plugins.push(progressPlugin);
	return plugins;
}