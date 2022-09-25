import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import spawn from 'cross-spawn';

function server() {
	return new Promise((resolve, reject) => {
		// Spawn NPM asynchronously
        const command = 'yarn'
        const args = ['start']
		const child = spawn(command, args, {
			stdio: 'inherit',
		});
		child.on('close', (code) => {
            console.log('code:', code)
			if (code !== 0) {
				reject({
					command: `${command} ${args}`,
				});
				return;
			}
			resolve();
		});
	});
}

export default async function (options) {
	const { port } = options;
	server();
}
