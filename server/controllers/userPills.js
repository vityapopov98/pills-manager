
var userPills = require('../model/data').userPills
var recipe = require('../model/data').recipe

function getUserPills(req, res) {
    console.log('user pills: ', userPills)
    res.json({pills: userPills, incompatible: check()})
}
function addUserPills(req, res) {
    console.log(req.body)
    userPills.push(req.body.pills)
    console.log('user pills: ', userPills)
    res.json({pills: userPills, incompatible: check()})
}
function addRecipeToUserPills(req, res) {
    console.log(req.body)
    userPills.push(...req.body.pills)
    recipe.splice(0, recipe.length)

    console.log('user pills: ', userPills)
    res.json({pills: userPills, incompatible: check()})
}
function deleteUserPills(req, res) {
    console.log(req.query)
    userPills.splice(req.query.index, 1)
    console.log('user pills: ', userPills)
    res.json({pills: userPills, incompatible: check()})
}



function check(){
    //Check capatibility
    var incompatiblePills = []
  
    userPills.forEach((element, index)=>{
      console.log("el", element.name)
      console.log("el", userPills.incompatible)
      userPills.forEach(catalog =>{
          if(catalog.incompatible == element.name){
            console.log(`Несовместимые лекарста ${catalog.name} и ${element.name}`)
            incompatiblePills.push(`Несовместимые лекарста ${catalog.name} и ${element.name}`)
          }
        })
      })
      return incompatiblePills
}


module.exports = {
    getUserPills,
    addUserPills,
    addRecipeToUserPills,
    deleteUserPills
}