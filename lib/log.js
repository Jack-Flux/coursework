const chalk = require('chalk');
const { log } = console;

const time = () => new Promise((res) => {
  const date = new Date();
  const logDate = `[${('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear()}]`;
  const logTime = `[${('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2)}]`;
  res(chalk.blue(logDate) + chalk.green(logTime));
});

const logger = async (string, err) => {
  const logTime = await time();
  log(`${logTime} ${err ? chalk.red(string) : string}`);
};

module.exports = logger;
