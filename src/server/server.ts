import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import http from 'http';
import webpack from 'webpack';
import logger from '../logger/index.js';
import spawn from 'cross-spawn';

interface ServerOptions {
	port: number
}


function server() {
	return new Promise((resolve, reject) => {
		// Spawn NPM asynchronously
		const command = 'webpack';
		const args = [''];
		const child = spawn(command, args, {
			stdio: 'inherit',
		});
		child.on('close', (code: number) => {
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

export default async function (options: ServerOptions) {
	const { port } = options;
	server();
}