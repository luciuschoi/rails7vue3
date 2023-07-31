<template>
   
   <el-form
    label-position="top"
    label-width="100px"
    :model="blog"
    size="large"
  >
    <el-alert style="padding:0.3em;margin-bottom:20px" :type="open_index=='new' ? 'success' : 'warning'" :closable="false">
      <h2>{{ open_index=='new' ? 'New Blog' : 'Edit Blog' }}</h2>
    </el-alert>   
    <el-form-item label="Subject" >
      <el-input v-model="blog.subject" />
    </el-form-item>
    <el-form-item label="Context">
      <el-input v-model="blog.context" type="textarea" rows="5" />
    </el-form-item>
    <el-divider border-style="dotted" />
    <el-row justify="end">
      <el-form-item >
        <el-button @click="$emit('form_close', open_index)" >Cancel</el-button>
        <el-button type="primary" @click="onSubmit()"> {{ open_index=="new" ? 'Create' : 'Update' }} </el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
import { useBlog  } from "../../stores/blog_store"
export default {
  props: ['blog', 'open_index'],
  emits: ['form_close'],
  data(){
    return {
      
    }
  },
  setup(){
    const blogStore = useBlog()
    return {
      blogStore
    }
  },
  methods: {
    onSubmit(){
      const headers = {common: {'X-CSRF-Token':  document.querySelector('meta[name="csrf-token"]').getAttribute('content'),'Content-Type': 'application/json'}}
      this.$axios[this.open_index=="new"? 'post' : 'put'](`/api/main/${this.open_index=='new'? '':this.blog.id }`, { blog: this.blog }, { headers: headers} )
      .then(result=>{
        this.blogStore.blogs = result.data.blogs
        this.$emit('form_close', this.open_index)
      })
    },
  },
}
</script>

<style>

</style>