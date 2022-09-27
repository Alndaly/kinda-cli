import { createRequire } from 'module';
import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import http from 'http';
import webpack from 'webpack';
import logger from '../logger/index.js';
import { ServerOptions } from '../types/index.js'
import { getWebpackConfigure } from '../webpack/index.js';
import spawn from 'cross-spawn';
import webpackDevServer from 'webpack-dev-server';
import { getConfigFile } from '../common/utils/configUtil.js';
const kindaConfig = await getConfigFile(path.resolve());

const webpackConfigure = getWebpackConfigure(kindaConfig.webpackConfiguration, 'development')

const compiler = webpack(webpackConfigure)

const devServerOptions = { ...(webpackConfigure.devServer) };

const runServer = async (server: any) => {
	console.log('Starting server...');
	server.startCallback(() => {
		const localIPv4 = webpackDevServer.internalIPSync('v4');
		const localIPv6 = webpackDevServer.internalIPSync('v6');
		//@ts-ignore
		// console.log(`Successfully started server on http://localhost:${webpackConfigure.devServer.port}`);
	});
	process.on('SIGINT', () => {
		stopServer(server)
	});
}


const stopServer = async (server: any) => {
	console.log('\nStopping server...');
	server.stopCallback(() => {
		console.log('Server stopped.');
	});
};

const getFinalOptions = (options: ServerOptions) => {
	const { port } = options;
	if (port) {
		return { ...devServerOptions, ...options }
	}
	return devServerOptions
}

export default async function (options: ServerOptions) {
	const server = new webpackDevServer(getFinalOptions(options), compiler);
	runServer(server);
}
