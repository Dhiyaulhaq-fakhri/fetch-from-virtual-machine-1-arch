#!/usr/bin/env node

import { execSync } from 'node:child_process';
import os from 'node:os';
import chalk from 'chalk';

function run(cmd) {
	try {
		return execSync(cmd + ' 2>/dev/null', { encoding: 'utf8' }).trim();
	} catch {
		return 'N/A';
	}
}

const user = os.userInfo().username;
const host = os.hostname();
const osName = run("grep PRETTY_NAME /etc/os-release | cut -d'\"' -f2");
const kernel = run('uname -r');
const cpu = run("lscpu | grep 'Model name' | cut -d':' -f2 | xargs");
const ramUsed = run("free -h | awk '/Mem:/ {print $3}'");
const ramTotal = run("free -h | awk '/Mem:/ {print $2}'");
const plasma = run('plasmashell --version');
const shell = process.env.SHELL;
const uptime = run('uptime -p');

// logo 
const logo = [
'    		       -`',
'   		      .o+`',
'                     `ooo/',
'                    `+oooo:',
'                   `+oooooo:',
'                   -+oooooo+:',
'                 `/:-:++oooo+:',
'                `/++++/+++++++:',
'               `/++++++++++++++:',
'              `/+++ooooooooooooo/`',
'             ./ooosssso++osssssso+`',
'            .oossssso-````/ossssss+`',
'           -osssssso.      :ssssssso.',
'          :osssssss/        osssso+++.',
'         /ossssssss/        +ssssooo/-',
'       `/ossssso+/:-        -:/+osssso+-',
'     `+sso+:-`                  `.-/+oso:',
'    `++:.                            `-/+/',
'    .`                                  `',
];

const info = [
	chalk.cyan.bold(`${user}@${host}`),
	chalk.cyan('--------------------'),
	`${chalk.yellow('OS:')}      ${osName}`,
	`${chalk.yellow('Kernel:')}  ${kernel}`,
	`${chalk.yellow('Plasma:')}  ${plasma}`,
	`${chalk.yellow('Shell:')}   ${shell}`,
	`${chalk.yellow('CPU:')}     ${cpu}`,
	`${chalk.yellow('RAM:')}     ${ramUsed} / ${ramTotal}`,
	`${chalk.yellow('Uptime:')}  ${uptime}`,
];

const maxLines = Math.max(logo.length, info.length);

for (let i = 0; i < maxLines; i++) {
	const left = (logo[i] || '').padEnd(40);
	const right = info[i] || '';
	console.log(`${chalk.blue(left)}${right}`);
}
