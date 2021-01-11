const express = require('express');//для роутинга
const app = express();
const bodyParser = require('body-parser');//для парсинга в роутинге


app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended: false}) //включение парсера
console.log("hello!!!!! how are you ?))))")

app.use(express.static('dist'));




const pillsCatalog = require('./model/pillsCatalog.json')
const {getUserPills, addUserPills, addRecipeToUserPills, deleteUserPills}= require('./controllers/userPills')

var userPills = require('./model/data').userPills
var recipe = require('./model/data').recipe

/*
Эти переменные теперь "Глобальные". находятся в модуле './model/data'

// var userPills = []
// var recipe = []

*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get('/api/hello', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
  res.json(pillsCatalog)
})



//---------- Аптечка пользователя --------------
app.get('/api/getUserPills', urlencodedParser, getUserPills)

/*
Рефакторинг - выделение модуля (но это не точно, что оно так называется)
Выносим код ниже в можуль (файл) userPills.js

В данном файле server.js импортируем из модуля userPills.js функцию getUserPills

// (req, res)=>{
//   console.log('user pills: ', userPills)
//   res.json({pills: userPills, incompatible: check()})
// }

*/

app.post('/api/addUserPills', urlencodedParser, addUserPills)

app.post('/api/addRecipeToUserPills', urlencodedParser, addRecipeToUserPills)

app.delete('/api/deleteUserPills', urlencodedParser, deleteUserPills)

//---------- Рецепт --------------
app.get('/api/getRecipePills', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
  console.log('recipe pills: ', recipe)
  res.json({recipe: recipe, incompatible: checkRecipe(), cost: recipeCost()})
})
app.post('/api/addRecipePills', urlencodedParser, (req, res)=>{
  recipe.push(req.body.pills)

  console.log('user pills: ', recipe)
  res.json({recipe: recipe, incompatible: checkRecipe(), cost: recipeCost()})
})

app.delete('/api/deleteRecipePills', urlencodedParser, (req, res)=>{
  console.log(req.query)
  recipe.splice(req.query.index, 1)
  console.log('user pills: ', recipe)
  res.json({recipe: recipe, incompatible: checkRecipe(), cost: recipeCost()})
})

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




// --------Functions--------
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

function checkRecipe(){
  var incompatiblePills = []

  recipe.forEach((element, index)=>{
    console.log("el", element.name)
    console.log("el", userPills.incompatible)
    recipe.forEach(catalog =>{
        if(catalog.incompatible == element.name){
          console.log(`Несовместимые лекарста ${catalog.name} и ${element.name}`)
          incompatiblePills.push(`Несовместимые лекарста ${catalog.name} и ${element.name}`)
        }
      })
    })
    return incompatiblePills
}