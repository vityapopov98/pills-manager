var recipe = require('../model/data').recipe

function recipeCost(){
    console.log('calc cost')
    var sumCost = 0
    recipe.forEach(element=>{
      if(element.cost != undefined){
        sumCost += element.cost
      }
    })
    return sumCost
}

module.exports = {recipeCost}