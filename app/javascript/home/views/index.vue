<template>

  <div>
    <Carousel />
    
    <el-button type="primary"  @click="show_new_form()" style="margin-top:20px"><el-icon><Edit/></el-icon> New Blog</el-button>
    <el-collapse-transition>
      <el-card style="margin-top:20px" v-show="new_form_show">
        <BlogForm  :open_index="'new'" @form_close="form_close" :blog="blog"  />
      </el-card>
    </el-collapse-transition>
    <template v-for="(b, k) in blogs" :key='k' >
      <el-collapse-transition>
        <el-card style="margin-top:20px" v-if="edit_index[k]">
          <BlogForm :open_index="k" @form_close="form_close" :blog="b" />
        </el-card>
      </el-collapse-transition>
      <el-card style="margin-top:20px" v-if="!edit_index[k]">
        <template #header v-if="!edit_index[k]" >
          <div class="card-header">
            <h3 class="text" v-html="b.subject"></h3>
            <div>
              <el-button type="primary" link @click="edit_form_open(k)" >Edit</el-button>
              <el-button type="danger" link @click="delete_blog(b)" >Delete</el-button>
            </div>
          </div>
        </template>
        <div v-html="b.context" style="white-space:pre"></div> 
        
      </el-card>
    </template>

    <el-card style="margin-top:20px"> 
      <el-calendar v-model="today"  />
    </el-card>

  </div>

</template>

<script >
  import { useBlog } from '../../stores/blog_store'
  import BlogForm from '../components/blog_form.vue'
  import Carousel from "../components/carousel.vue"
  import { ElMessage, ElMessageBox } from 'element-plus'
  
  export default {
    data(){
      return{
        new_form_show: false,
        today: new Date(),
        blogs: [],
        blog: {
          subject: '',
          context: '',
        },
        edit_index: [],
      }
    },
    setup(){
      const blogStore = useBlog()
      return {
        blogStore
      }
    },
    
    async created(){
      await this.blogStore.index({ common: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'), 'Content-Type': 'application/json' } })
      this.blogs = this.blogStore.blogs
      this.edit_index = this.set_edit_default_index()
    },

    methods: {
      show_new_form(){
        this.edit_index = this.set_edit_default_index()
        this.new_form_show =!this.new_form_show
      },
      
      set_edit_default_index(){
       return new Array(this.blogs.length).fill(false);
      },

      edit_form_open(index){
        this.new_form_show = false
        this.edit_index = this.set_edit_default_index()
        this.edit_index[index] = true
      },

      form_close(type){
        if(type=="new"){
          console.log("1----------------");
          this.show_new_form()
          this.blog = {
            subject: '',
            context: '',
          }
        }else{
          console.log("2----------------");
          this.edit_index[type] = false 
        }
        this.blogs = this.blogStore.blogs
      },

      delete_blog(blog){
        ElMessageBox.confirm(
        '정말 삭제 하시겠습니까?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          const headers = {common: {'X-CSRF-Token':  document.querySelector('meta[name="csrf-token"]').getAttribute('content'),'Content-Type': 'application/json'}}
          this.$axios.delete(`/api/main/${blog.id}`, { headers: headers} )
          .then(result=>{
            this.blogStore.blogs = result.data.blogs
            this.blogs = result.data.blogs
            ElMessage({
              type: 'success',
              message: 'Delete completed',
            })
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
      }

    },

    components: {
      Carousel,
      BlogForm,
    } 

  }

</script>



<style scoped>
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

</style>