const { Telegraf } = require('telegraf');
require('dotenv').config();
const axios = require('axios');
const key_1 = "5902332C8C07425FAC8C5C078D93525C"
const key_2 = "0AAF2C05CD5E4B4884E4AE59A245ACEC"

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.start((ctx) => {
    ctx.reply(`Hello ${ctx.from.first_name}, Please enter your phone number to check.\nExample: +6281234567890`);
    bot.hears(/^\+\d+$/, async (ctx) => {
        const num = ctx.message.text
        if(num.match) {
            ctx.reply(`Please wait....`)
            try {
                function getRandomKey() {
                    const keys = [key_1, key_2];
                    const randomIndex = Math.floor(Math.random() * keys.length);
                    return keys[randomIndex];

                  }
                const payload = {
                    key: getRandomKey(),
                    phone: num,
                    default_country: " "
                }

                const headers = {
                    "Content-Type": "application/json"
                }

                const get = await axios.get('https://api.veriphone.io/v2/verify', { params: payload, headers: headers })
                const data = get.data
                setTimeout(() => {
                    const pesan = `LookUp Result\n\nStatus : ${data.status}\nPhone : ${data.phone}\nIs Valid : ${data.phone_valid}\nPhone Type : ${data.phone_type}\nPhone Region : ${data.phone_region}\nCountry : ${data.country}\nCountry Code : ${data.country_code}\nCountry Prefix : ${data.country_prefix}\nInternational Number : ${data.international_number}\nLocal Number : ${data.local_number}\nCarrier : ${data.carrier}\n\nDonate here : https://saweria.co/donate/irfnrdh`
                    ctx.reply(pesan)
                }, 1500)
                
                

            } catch (err) {
                console.log(err)
                ctx.reply(`Error when checking number, please try again later.`)
            }
        } else {
            ctx.reply(`Please enter a valid number with country code.`)
        }
    })
})
bot.launch()
