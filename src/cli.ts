#! /usr/bin/env node

import { program, Option } from 'commander';
import create from './create/create.js';
import server from './server/server.js';
import logger from './logger/index.js';
import build from './build/build.js';
import semver from 'semver';
import { createRequire } from 'module';
import { template_list, structure_list } from './common/config/config.js';
import { getConfigFile } from './common/utils/configUtil.js';
import path from 'path'

//@ts-ignore
const packageJson = createRequire(import.meta.url)('../package.json');

const requiredVersion = packageJson.engines.node;

// 检验node版本
if (!semver.satisfies(process.version, requiredVersion)) {
	logger.error('Minimum Node.js version not met :(');
	logger.info`You are using Node.js number=${process.version}, Requirement: Node.js number=${requiredVersion}.`;
	process.exit(1);
}

// 获取kinda.config.js基础配置
const kindaConfig = await getConfigFile(path.resolve());

program
	.name('kinda-cli')
	.description(`CLI to make developers' life easy.`)
	// 配置版本号信息
	.version(`v${packageJson.version}`)
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
			'-s, --structure <structure>', 'choose the base structure of your project'
		).choices(structure_list)
	)
	.addOption(
		new Option(
			'-t --type <type>',
			'choose the type of your application',
		).choices(template_list.map((item) => item.value))
	)
	.action((name, options) => {
		create(name, options, kindaConfig);
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
		server(options, kindaConfig);
	});

// 打包命令
// TODO 待完善
program
	// 定义命令和参数
	.command('build')
	// init命令介绍
	.description('build optimized project')
	.addOption(
		new Option('-w --watch', 'keep watching file changes, rebuild when file changes')
	)
	.action((options) => {
		build(options, kindaConfig);
	});

program.parse(process.argv);
