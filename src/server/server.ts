import { getWatchOptions, watchHandlers } from './../webpack/configure/watch/index.js';
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import http from 'http';
import webpack from 'webpack';
import anymatch from 'anymatch'
import logger from '../logger/index.js';
import { getWebpackConfigure } from '../webpack/index.js';
import spawn from 'cross-spawn';
import child_process from 'child_process'

interface ServerOptions {
	port: number
}

const compier = webpack(getWebpackConfigure())

function server() {
	const watching = compier.watch(getWatchOptions(), watchHandlers)
	process.on('SIGINT', () => {
		watching.close(() => {
			console.log("\nWebpack compier Watching Ended.");
		});
	});
}

export default async function (options: ServerOptions) {
	const { port } = options;
	server();
}
