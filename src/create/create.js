import path from 'path';
import fs from 'fs-extra';
import { template_list } from '../config/config.js';
import inquirer from 'inquirer';
import { Generator } from './generator.js';

export default async function (name, options) {
	let { type, force } = options;

	// 当前命令行选择的目录
	const cwd = process.cwd();
	// 需要创建的目录地址
	const targetAir = path.join(cwd, name);
	// 目录是否已经存在？
	if (fs.existsSync(targetAir)) {
		// 是否为强制创建？
		if (force) {
			await fs.remove(targetAir);
		} else {
			// 询问用户是否确定要覆盖
			let { action } = await inquirer.prompt([
				{
					name: 'action',
					type: 'list',
					message: '文件目录已经存在，是否强制覆盖？',
					choices: [
						{
							name: '覆盖',
							value: 'overwrite',
						},
						{
							name: '取消',
							value: false,
						},
					],
				},
			]);
			if (!action) {
				return;
			} else if (action === 'overwrite') {
				// 移除已存在的目录
				console.log(`Removing...`);
				await fs.remove(targetAir);
			}
		}
	}
	if (!type) {
		// 询问用户应用类型
		let data = await inquirer.prompt([
			{
				name: 'value',
				type: 'list',
				message: '项目类型',
				choices: template_list,
			},
		]);
		type = data.value;
	}

	// 创建项目
	const generator = new Generator(name, type, targetAir);

	// 开始创建项目
	generator.create();
}
