import { getRepoList, getTagList } from '../common/http.js';
import { template_prefix, template_offer } from '../config/config.js';
import ora from 'ora';
import inquirer from 'inquirer';
import util from 'util';
import path from 'path';
import chalk from 'chalk';
//@ts-ignore
import downloadGitRepo from 'download-git-repo';
const downloadGitRepoPro = util.promisify(downloadGitRepo);
// 添加加载动画
async function wrapLoading(fn, message, ...args) {
    // 使用 ora 初始化，传入提示信息 message
    const spinner = ora(message);
    // 开始加载动画
    spinner.start();
    try {
        // 执行传入方法 fn
        const result = await fn(...args);
        // 状态为修改为成功
        spinner.succeed();
        return result;
    }
    catch (error) {
        // 状态为修改为失败
        spinner.fail('请求失败，重新发起...');
        return;
    }
}
async function getRepo(filter) {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, '等待获取模版');
    if (!repoList)
        return;
    // 过滤我们需要的模板名称
    // 约定俗称的模版前缀
    // 组件库模版：template-components-*
    // web中台模版：template-web-app-*
    const repos = repoList.filter((item) => {
        return item.name.indexOf(`${template_prefix}${filter}-`) !== -1;
    });
    if (!repos.length) {
        console.log(`There is no templates on the git, please waiting for developing, or connect ${chalk.cyan('1142704468@qq.com')}`);
        process.exit(1);
    }
    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
        name: 'repo',
        type: 'list',
        choices: repos,
        message: '请选择一个你想要使用的模版',
    });
    // 3）return 用户选择的名称
    return repo;
}
// 获取用户选择的版本
// 1）基于 repo 结果，远程拉取对应的 tag 列表
// 2）用户选择自己需要下载的 tag
// 3）return 用户选择的 tag
async function getTag(repo) {
    // 1）基于 repo 结果，远程拉取对应的 tag 列表
    const tags = await wrapLoading(getTagList, '等待获取版本号', repo);
    if (!tags)
        return;
    // 过滤我们需要的 tag 名称
    const tagsList = tags.map((item) => item.name);
    // 2）用户选择自己需要下载的 tag
    const { tag } = await inquirer.prompt({
        name: 'tag',
        type: 'list',
        choices: tagsList,
        message: '请选择模版的版本号',
    });
    // 3）return 用户选择的 tag
    return tag;
}
// 下载远程模板
// 1）拼接下载地址
// 2）调用下载方法
async function download(repo, tag, targetDir) {
    // 1）拼接下载地址
    const requestUrl = `${template_offer.name}/${repo}${tag ? '#' + tag : ''}`;
    // 2）调用下载方法
    await wrapLoading(downloadGitRepoPro, // 远程下载方法
    'downloading template', // 加载提示信息
    requestUrl, // 参数1: 下载地址
    path.resolve(process.cwd(), targetDir) // 参数2: 创建位置
    );
}
export class Generator {
    constructor(name, type, targetDir) {
        // 目录名称
        this.name = name;
        // 创建位置
        this.targetDir = targetDir;
        // 项目类型
        this.type = type;
        // 对 download-git-repo 进行 promise 化改造
    }
    // 核心创建逻辑
    // 1）获取模板名称
    // 2）获取 tag 名称
    // 3）下载模板到模板目录
    async create() {
        try {
            // 1）获取模板名称
            const repo = await getRepo(this.type);
            // 2) 获取 tag 名称
            const tag = await getTag(repo);
            // 3）下载模板到模板目录
            await download(repo, tag, this.targetDir);
            // 4）模板使用提示
            console.log(`${chalk.green('Successfully')} create ${chalk.cyan(this.name)}`);
            console.log(`cd ${chalk.cyan(this.name)}`);
            console.log(`yarn`);
            console.log('yarn start');
        }
        catch {
            console.log(`${chalk.red('Failed')} create ${chalk.cyan(this.name)}`);
        }
    }
}
