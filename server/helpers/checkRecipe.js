var recipe = require('../model/data').recipe

function checkRecipe(){
    var incompatiblePills = []
  
    recipe.forEach((element, index)=>{
      recipe.forEach(catalog =>{
          if(catalog.incompatible == element.name){
            console.log(`Несовместимые лекарста ${catalog.name} и ${element.name}`)
            incompatiblePills.push(`Несовместимые лекарста ${catalog.name} и ${element.name}`)
          }
        })
      })
      return incompatiblePills
}

module.exports = {
    checkRecipe
}