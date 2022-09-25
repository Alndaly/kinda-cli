import chalk from 'chalk';

const path = (msg) => chalk.cyan.underline(`"${String(msg)}"`);
const url = (msg) => chalk.cyan.underline(msg);
const name = (msg) => chalk.blue.bold(msg);
const code = (msg) => chalk.cyan(`\`${String(msg)}\``);
const subdue = (msg) => chalk.gray(msg);
const num = (msg) => chalk.yellow(msg);

function interpolate(msgs, ...values) {
	let res = '';
	values.forEach((value, idx) => {
		const flag = msgs[idx].match(/[a-z]+=$/);
		res += msgs[idx].replace(/[a-z]+=$/, '');
		const format = (() => {
			if (!flag) {
				return (a) => a;
			}
			switch (flag[0]) {
				case 'path=':
					return path;
				case 'url=':
					return url;
				case 'number=':
					return num;
				case 'name=':
					return name;
				case 'subdue=':
					return subdue;
				case 'code=':
					return code;
				default:
					throw new Error(
						'Bad Docusaurus logging message. This is likely an internal bug, please report it.'
					);
			}
		})();
		res += Array.isArray(value)
			? `\n- ${value.map((v) => format(v)).join('\n- ')}`
			: format(value);
	});
	res += msgs.slice(-1)[0];
	return res;
}

function stringify(msg) {
	if (String(msg) === '[object Object]') {
		return JSON.stringify(msg);
	}
	return String(msg);
}

function info(msg, ...values) {
	console.info(
		`${chalk.cyan.bold('[INFO]')} ${
			values.length === 0 ? stringify(msg) : interpolate(msg, ...values)
		}`
	);
}

function warn(msg, ...values) {
	console.warn(
		chalk.yellow(
			`${chalk.bold('[WARNING]')} ${
				values.length === 0 ? stringify(msg) : interpolate(msg, ...values)
			}`
		)
	);
}

function error(msg, ...values) {
	console.error(
		chalk.red(
			`${chalk.bold('[ERROR]')} ${
				values.length === 0 ? stringify(msg) : interpolate(msg, ...values)
			}`
		)
	);
}

function success(msg, ...values) {
	console.log(
		`${chalk.green.bold('[SUCCESS]')} ${
			values.length === 0 ? stringify(msg) : interpolate(msg, ...values)
		}`
	);
}

function throwError(msg, ...values) {
	throw new Error(
		values.length === 0 ? stringify(msg) : interpolate(msg, ...values)
	);
}

function newLine() {
	console.log();
}

/**
 * Takes a message and reports it according to the severity that the user wants.
 *
 * - `ignore`: completely no-op
 * - `log`: uses the `INFO` log level
 * - `warn`: uses the `WARN` log level
 * - `throw`: aborts the process, throws the error.
 *
 * Since the logger doesn't have logging level filters yet, these severities
 * mostly just differ by their colors.
 *
 * @throws In addition to throwing when `reportingSeverity === "throw"`, this
 * function also throws if `reportingSeverity` is not one of the above.
 */
function report(reportingSeverity) {
	const reportingMethods = {
		ignore: () => {},
		log: info,
		warn,
		throw: throwError,
	};
	if (
		!Object.prototype.hasOwnProperty.call(reportingMethods, reportingSeverity)
	) {
		throw new Error(
			`Unexpected "reportingSeverity" value: ${reportingSeverity}.`
		);
	}
	return reportingMethods[reportingSeverity];
}

export default {
	red: (msg) => chalk.red(msg),
	yellow: (msg) => chalk.yellow(msg),
	green: (msg) => chalk.green(msg),
	bold: (msg) => chalk.bold(msg),
	dim: (msg) => chalk.dim(msg),
	path,
	url,
	name,
	code,
	subdue,
	num,
	interpolate,
	info,
	warn,
	error,
	success,
	report,
	newLine,
};
