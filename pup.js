const puppeteer = require('puppeteer')
const fs = require('fs')
const validator = require('validator')
const ImageKit = require('imagekit')
require('dotenv').config()
async function run() {
    const imageKit = new ImageKit({
        publicKey: process.env.PUBLICKEY,
        privateKey: process.env.PRIVATEKEY,
        urlEndpoint: process.env.URLENDPOINT
    })
    console.log(process.env.PUBLICKEY)
    console.log(process.env.PRIVATEKEY)
    const browser = await puppeteer.launch({
        defaultViewport: null
    })
    const page = await browser.newPage()
    try {
        let data = fs.readFileSync('links.txt', 'utf-8')
        const resultArray = data.split(/,\s*|\n/).map(item => item.replace(/'/g, ''));
        for (let url of resultArray) {
            const options = {
                requrie_protocol: true
            }
            console.log(validator.isURL(url, options))
            if (validator.isURL(url, options)) {
                await page.goto(url, { waitUntil: "networkidle0" }).catch((error) => console.log(error))
                const timestamp = new Date()
                const screenshot = await page.screenshot({
                    fullPage: true
                })
                    // or upload to your image storage bucket
                    .then((image) => {
                        imageKit.upload({
                            file: image,
                            fileName: `Screenshot:${timestamp}`
                        },
                            function (err, result) {
                                if (err) console.log(err)
                                else console.log(result)
                            })
                    })
            }
        }
        await browser.close()
    }
    catch (error) {
        console.error(error)
    }
}

run()
