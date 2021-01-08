<template>
  <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

<section>
  <input type="text" placeholder="Name" v-model="inputPills.name">
  <input type="text" placeholder="Cost" v-model="inputPills.cost">
  <textarea name="" id="" cols="30" rows="10" placeholder="Description" v-model="inputPills.decription"></textarea>
  <button class="btn btn-primary" v-on:click="addPills()">Add</button>
</section>

<section>
  <select class="form-select" aria-label="Default select example" @change="changePillsInput($event)">
  <option selected>Open this select menu</option>
  <option selected :value="pill.name" v-for="pill in catalog" :key="pill.name">{{pill.name}}</option>
</select>

</section>
  <section>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-12 d-flex">
          <div class="card" style="width: 18rem; margin: .5rem;" v-for="(pill, index) in pills" :key="index">
            <div class="card-body">
              <h5 class="card-title">{{pill.name}}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{pill.cost}}</h6>
              <p class="card-text">{{pill.description}}</p>
              <a href="#" class="card-link">Инструкция</a>
              <a href="#" class="card-link">Удалить</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      pills: [],
      inputPills:{
        name: '',
        cost: 0,
        description: 'lorem ipsum',
      },
      catalog: [{}]
    }
  },
  methods:{
    addPills(){


      

      this.pills.push(this.inputPills)


      this.analyzePillsCompatibility()
    },
    changePillsInput(event){

      this.inputPills.name = event.target.options[event.target.options.selectedIndex].text
    },
    analyzePillsCompatibility(){
      this.pills.forEach((element, index)=>{
        console.log("el", element.name)
        console.log("el", this.catalog[index].incompatible)
        this.catalog.forEach(catalogPills =>{
            if(catalogPills.incompatible == element.name){
              alert(`Несовместимые лекарста ${catalogPills.name} и ${element.name}`)
            }
        })
      })
    },
    deletePills(){

    },
    loadUserPills(){
      fetch('userPills.json',
      {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

      }
      ).then(res=>{
        console.log(res)
        return res.json()
      }).then(data=>{
        console.log(data)
        this.res = data
        this.pills = data.pills
      })


      fetch('pillsCatalog.json',
      {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

      }
      ).then(res=>{
        console.log(res)
        return res.json()
      }).then(data=>{
        console.log(data)
        this.res = data
        this.catalog = data.pills
      })

    }
  },
  mounted(){
    this.loadUserPills()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
