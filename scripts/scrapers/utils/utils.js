const parser = require('cron-parser');
const chalk = require('chalk');

const scraperCanRun = async (scraper) => {
  const frequency = parser.parseExpression(scraper.frequency);
  const currentDate = parseInt((new Date().getTime() / 1000), 10);
  let nextExecutionAt = '';

  if (scraper.next_execution_at) {
    nextExecutionAt = scraper.next_execution_at;
  } else {
    nextExecutionAt = (frequency.next().getTime() / 1000);
    await strapi.query('scraper').update({
      id: scraper.id,
    }, {
      next_execution_at: nextExecutionAt,
    });
  }

  if (nextExecutionAt <= currentDate) {
    await strapi.query('scraper').update({
      id: scraper.id,
    }, {
      next_execution_at: (frequency.next().getTime() / 1000),
    });
    return true;
  }
  return false;
};

const getAllSG = async (scraper) => {
  const existingSG = await strapi.query('site-generator').find({
    scraper: scraper.id,
  }, ['name']);
  const allSG = existingSG.map((x) => x.name);
  console.log(`Site generators in database: \t${chalk.blue(allSG.length)}`);

  return allSG;
};

const getDate = async () => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return `${date} ${time}`;
};

const getReport = async (newSG) => ({ newSG, date: await getDate() });

module.exports = {
  getReport, getDate, getAllSG, scraperCanRun,
};
