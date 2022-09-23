import path from 'path';
import fs from 'fs-extra';
import { template_list } from './config.js';
import inquirer from 'inquirer';
import { Generator } from './generator.js';

export default async function (options) {
	const { port } = options;
    console.log(port)
}
