import path from 'path';
import fs from 'fs-extra';
import { template_list } from '../common/config/config.js';
import inquirer from 'inquirer';
import { Generator } from '../create/generator.js';

interface BuildOptions {

}

export default async function (options: BuildOptions) {
	console.log(options);
}
