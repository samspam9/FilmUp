const db = require('../controllers/db.controller');
const Entry = require('../models/entry.model');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const countries = ["south-africa", "germany", "saudi-arabia", "argentina", "australia", "austria", "belarus", "belgium", "brasil", "bulgaria", "canada", "chile", "china", "colombia", "korea", "costa-rica", "croatia", "denmark", "egypt", "spain", "finland", "france", "greece", "hungary", "india", "indonesia", "iran", "ireland", "israel", "italy", "japan", "kazhastan", "malaysia", "mexico", "morroco", "norway", "new-zealand", "netherlands", "poland", "portugal", "peru", "romania", "united-kingdom", "russia", "czeck-republic", "singapore", "switzerland", "sweden", "taiwan", "turkey", "ukraine", "uruguay", "venezuela", "united-states"];
countries.sort();

db.connect("mongodb+srv://sony:sonyinnov123@sonyinnovdb-6q9td.mongodb.net/data");

(async function main() {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--headless', '--disable-gpu']});
    let contents = [];
    const page = await browser.newPage();
    for (var country of countries) {
        console.log(country);
        await page.goto(`https://www.shazam.com/fr/charts/top-100/${country}`, {waitUntil: 'networkidle2'});
        contents.push(await page.evaluate(() => document.body.innerHTML));
    }

    let res = contents.map((e, j) => {
        let $ = cheerio.load(e);
        let artist = [];
        let songs = [];
        $('div.artist a, div.artist div').each(function (i, e) {
            artist[i] = $(this).text();
        });
        $('div.title a').each(function (i, e) {
            songs[i] = $(this).text();
        });
        return artist.map((content, i) => {
            return {
                rank: i + 1,
                artist: content,
                song: songs[i],
                country: countries[j],
            }
        });
    });

    Entry.collection.drop();
    const flat = [].concat(...res);
    flat.map(async e => {
        const newEntry = new Entry(e);
        newEntry.save();
    })
    await browser.close();
    mongoose.connection.close();
})();
