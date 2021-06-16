const { promisify } = require("util")
const download = promisify(require("git-pull-or-clone"))
const ora = require("ora")
const { resolve } = require("path")
const { spawn } = require("../../api/process")
const chalk = require("chalk")
const which = require('which')
const npm = which.sync('npm')

const log = (...args) => console.log(chalk.green(...args))

module.exports = async (projectName) => {
  console.log("path", resolve("."));
  // 项⽬名称
  const name = projectName;
  const repo = "git@github.com:zoeyzhao19/engineering-demo.git";
  const desc = resolve(`./${name}`);
  console.log("desc", desc);
  const process = ora(`
 !
 下载.....${repo}`);
  process.start();
  try {
    await download(repo, desc);
    process.succeed();
  } catch (e) {
    console.log(e)
    process.fail()
  }

  // 安装依赖
  log("安装依赖");
 // 安装依赖
  await spawn(process.platform === 'win32' ? npm.cmd : npm, ["install"], { cwd: `./${name}` });
  log(`
    "
    安装完成：
    To get Start:
    ===========================
    cd ${name}
    npm run serve
    ===========================
    `)
}