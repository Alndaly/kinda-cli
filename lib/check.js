import chalk from 'chalk';

// 判断用户node版本，如果低于18直接结束进程
export function checkNodeVersion(){
	const nodeVersion = process.versions.node.split('.')
	if(nodeVersion[0]<18){
		console.log(`kinda is developed with ${chalk.bold.red('node-18.6.0')} or higher, but your current node version is ${chalk.bold.red(process.versions.node)}. Consider upgrade your node version first.` );
        process.exit(1)
	}
}