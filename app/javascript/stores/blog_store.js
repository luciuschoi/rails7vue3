import { defineStore } from 'pinia'

export const useBlog = defineStore('blog', {

  state: ()=>{
    return {
      blogs: []
    }
  },

  actions: {
    async index(headers) {
      console.log("index----------------");
      console.log(headers);
      return this.axios.get('/api/main', { headers: headers} ).then(response => {   
        console.log(response);   
        this.blogs = response.data.blogs;
      })  
    },
  }


})