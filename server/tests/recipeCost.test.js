const {recipeCost} = require('../helpers/recipeCost');

var recipe = require('../model/data').recipe

recipe.push({
    name: "Анальгин",
    cost: 44,
    description: "Лихорадочный синдром (инфекционно-воспалительные заболевания, укусы насекомых), болевой синдром - кишечная колика,головная и зубная боль, ожоги и т.д "
},
{
    name: "Антигриппин",
    cost: 340,
    description: "Грипп, ОРВИ, острый ринит - симптоматическое лечение.",
    incompatible: "Анальгин"
})


test('recipe cost', () => {
  expect(recipeCost()).toBe(384);
});
