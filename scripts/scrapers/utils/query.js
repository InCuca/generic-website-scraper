const chalk = require('chalk');

const createSiteGenerators = async (
  content, scraper,
) => {
  try {
    await strapi.query('site-generator').create({
      content,
      scraper: scraper.id,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateScraper = async (scraper, report, errors) => {
  await strapi.query('scraper').update({
    id: scraper.id,
  }, {
    report,
    error: errors,
  });

  console.log(`Job done for: ${chalk.green(scraper.name)}`);
};

module.exports = {
  createSiteGenerators,
  updateScraper,
};
