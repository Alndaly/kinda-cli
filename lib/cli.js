#! /usr/bin/env node

// 判断node版本
const nodeVersion = process.versions.node.split('.');
if (nodeVersion[0] < 18) {
	console.log(
		`kinda is developed with ${chalk.bold.red(
			'node-18.6.0'
		)} or higher, but your current node version is ${chalk.bold.red(
			process.versions.node
		)}. Consider upgrade your node version first.`
	);
	process.exit(1);
}

import { program, Option } from 'commander';
import create from './create.js';
import server from './server.js';
import build from './build.js';
import { checkNodeVersion } from './check.js';
import packageInfo from '../package.json' assert { type: 'json' };
import { template_list } from './config.js';

program
	.name('kinda-cli')
	.description(`CLI to make developers' life easy.`)
	// 配置版本号信息
	.version(`v${packageInfo.version}`)
	.usage('<command> [option]');

// 项目创建命令
program
	// 定义命令和参数
	.command('create <app-name>')
	// init命令介绍
	.description('create program')
	// -f or --force 为强制创建，如果创建的目录存在则直接覆盖
	.addOption(
		new Option('-f, --force', 'overwrite target directory if it exist')
	)
	.addOption(
		new Option(
			'-t --type <type>',
			'choose the type of your application',
			'web-app'
		).choices(template_list.map((item) => item.value))
	)
	.action((name, options) => {
		create(name, options);
	});

// 本地开启服务命令
// TODO 待完善
program
	// 定义命令和参数
	.command('server')
	// init命令介绍
	.description('local server port')
	.addOption(
		new Option('-p --port <port>', 'choose the port of your local server')
	)
	.action((options) => {
		server(options);
	});

// 打包命令
// TODO 待完善
program
	// 定义命令和参数
	.command('build')
	// init命令介绍
	.description('build optimized project')
	.action((options) => {
		build(options);
	});

program.parse(process.argv);
