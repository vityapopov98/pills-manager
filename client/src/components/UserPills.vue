<template>
  <div id="app">
    <h1>Аптечка</h1>
      <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
  </nav> -->

  <section>
    
  </section>

<section v-if="incompatibilityNotification != '' && incompatibilityNotification != undefined">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="alert alert-danger" role="alert">
          {{incompatibilityNotification}}
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <!-- <input type="text" placeholder="Name" v-model="inputPills.name"> -->
  <!-- <input type="text" placeholder="Cost" v-model="inputPills.cost"> -->
  <!-- <textarea name="" id="" cols="30" rows="10" placeholder="Description" v-model="inputPills.decription"></textarea> -->

<div class="container">
  <div class="row">
    <div class="col-md-12 d-flex">
      <select class="form-select" aria-label="Default select example" @change="changePillsInput($event)">
        <option selected>Open this select menu</option>
        <option selected :value="pill.name" v-for="(pill, index) in catalog" :key="index">{{pill.name}}</option>
      </select>
      <button class="btn btn-primary mx-2" v-on:click="addPills()">Add</button>
    </div>
  </div>
</div>

</section>

  <section>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-12 card-container">
          
          <div class="card" style="width: 18rem; margin: .5rem;" v-for="(pill, index) in pills" :key="index">
            <div class="card-body">
              <h5 class="card-title">{{pill.name}}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{pill.cost}}</h6>
              <p class="card-text">{{pill.description}}</p>
              <a href="#" class="card-link">Инструкция</a>
              <button class="btn btn-sm btn-danger" @click="daleteUserPills(index)">Удалить</button>
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
      catalog: [{}],
      incompatibilityNotification: ''
    }
  },
  methods:{
    addPills(){
      var data = {
        pills: this.inputPills
      }

      fetch('/api/addUserPills',
      {
        method: 'POST',
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      }
      ).then(res=>{
        console.log(res)
        return res.json()
      }).then(data=>{
        console.log(data)
        this.res = data
        this.pills = data.pills
        console.log('incp', data.incompatible)
        console.log('incp', data.incompatible.length)
        this.incompatibilityNotification = data.incompatible[data.incompatible.length-1]
      })
    },
    changePillsInput(event){
      this.inputPills.name = event.target.options[event.target.options.selectedIndex].text
      console.log('pill form catalog', this.catalog[event.target.options.selectedIndex-1])
      console.log('pill form catalog name', event.target.options[event.target.options.selectedIndex].text)
      this.inputPills = this.catalog[event.target.options.selectedIndex-1]
      
    },
    // analyzePillsCompatibility(){
    //   this.pills.forEach((element, index)=>{
    //     console.log("el", element.name)
    //     console.log("el", this.catalog[index].incompatible)
    //     this.catalog.forEach(catalogPills =>{
    //         if(catalogPills.incompatible == element.name){
    //           alert(`Несовместимые лекарста ${catalogPills.name} и ${element.name}`)
    //         }
    //     })
    //   })
    // },
    daleteUserPills(index){
      fetch(`/api/deleteUserPills?index=${index}`,
      {
        method: 'DELETE',
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
        console.log('incp', data)
      })
    },
    loadUserPills(){
      fetch('/api/getUserPills',
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
        console.log('incp', data)
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
     fetch('/api/hello',
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
        console.log('from server', data)
      })
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
.card-container{
  width: 100%;
  display: flex;
  justify-content: space-between left;
  flex-wrap: wrap;
}
.card{
  background-color: #f4f4f4;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  margin: 1rem .5rem;
  width: calc(25% - 1rem);
}
</style>
