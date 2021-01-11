

const requests = {
  get(url){
    return request('GET', url)
  },
  post(url, data){
    return request('POST', url, data)
  },
  put(url, data){
    return request('PUT', url, data)
  },
  delete(url){
    return request('DELETE', url)
  },
  // request(method, url, data){

  //   var params = {}
  //   if(method == 'POST' || method ==  'PUT'){
  //     params = {
  //       method: method,
  //       headers : { 
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //     }
  //   }
  //   else{
  //     params = {
  //       headers : { 
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     }
  //   }
  //   return new Promise(function(resolve, reject){
  //     fetch(url, params).then(res=>{
  //       var data = res.json()
  //       return data
  //     }).then(data=>{
  //       resolve(data) 
  //     }).catch(error=>{
  //       reject(error)
  //     })
  //   })
  // },
  install: function(Vue){
    Object.defineProperty(Vue.prototype, 'requests', {
      get () { return requests }
    })
  }
}

function request(method, url, data){
  var params = {}
    if(method == 'POST' || method ==  'PUT'){
      params = {
        method: method,
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      }
    }
    else{
      params = {
        method: method,
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    }
  return new Promise(function(resolve, reject){
    fetch(url, params).then(res=>{
      var data = res.json()
      return data
    }).then(data=>{
      resolve(data) 
    }).catch(error=>{
      reject(error)
    })
  })
}

export default requests