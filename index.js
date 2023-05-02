const { Telegraf } = require('telegraf')
const axios = require('axios');

const API_ID = '31edd9b4';
const API_KEY ='9a2ef534c13b344f00b635b58ac88242';

const bot = new Telegraf('6043084560:AAF3jQajAtLt5HRe3Sodilpu_J4HQJrz78k');

bot.start((ctx) => ctx.reply('Приветствую! Отправьте название блюда, чтобы получить его рецепт)'))

bot.on('text', async (ctx) => {
        const response = await axios.get('https://api.edamam.com/api/recipes/v2' , {
        params: {
            app_id: API_ID,
            app_key: API_KEY,
            q: ctx.message.text,
            type: 'public'
        },
    });

    const recipe = response.data.hits[0].recipe;

    const message = `
    ${recipe.label}

    Ингредиенты:
    ${recipe.ingredientLines}

    Подробнее:
    ${recipe.uri}
    `;
    ctx.reply(message);
});

bot.launch();