# Scraper

A quick scraper application with a functioning example.

## Start

Install dependencies and run `yarn develop`.

Create your admin credentials on Strapi and create the first Scraper:

```
name: Jamstack.org
enabled: true
frequency: * * * * *
```

The cron tries to run the scraping code every minute, and:

- check if the Scraper is `enabled` before running;
- respects the `frequency` set;

The scraping is done with puppeteer and cherio and is at `/scripts/scrapers`. The content is saved to the **Site generators** model.

## From here...

You can turn it into a generic website scraper or just modify the index.js file to your needs. Possibilities are endless...