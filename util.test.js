const puppeteer = require('puppeteer');

test('Should test different registering inputs', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/register');
  await page.click('input#fname');
  await page.type('input#fname', 'sa');
  await page.click('button#btn');
  await page.type('input#lname', 'sa');
  await page.click('button#btn');
  await page.type('input#age', ' ');
  await page.click('button#btn');
  await page.type('input#email', 'ahmed');
  await page.click('button#btn');
  await page.type('input#password', '12345');
  await page.click('button#btn');
  await page.type('input#weight', ' ');
  await page.click('button#btn');
  await page.type('input#height', ' ');
  await page.click('button#btn');
});
