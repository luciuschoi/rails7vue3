<template>
  
  <div class="common-layout" ref="layout" >
    <el-container>
      <el-header >
        <el-row :gutter="20">
          <el-col :span="4">
              <h3>ROR LAB</h3>
          </el-col>
          <el-col :span="12">
           <Menu />
          </el-col>
          <el-col :span="4">
            <el-switch
              v-model="theme"
              class="mb-2"
              size="large"
              style="--el-switch-on-color: #3375b9; --el-switch-off-color: #1D1D1D"
              inline-prompt
              active-text="Dark"
              inactive-text="Light"
              @change="mode_change()"
              />
          </el-col>
        </el-row>
      </el-header>
      
      <el-main>
         <el-row :gutter="20">
            <el-col class="hidden-xs-only" :span="4"></el-col>
            <el-col :span="12">
              <router-view />
            </el-col>
            <el-col class="hidden-xs-only" :span="4"></el-col>
         </el-row> 

      </el-main>
     
    </el-container>
  </div>


 
</template>

<script  >
  import Menu from './menu.vue'

  export default {
    data(){
      return{
        theme: 'dark'
      }
    },
    methods: {
      mode_change(){
        const id_name = document.getElementById('main_theme')
        document.getElementById('main_theme').className = id_name.className == "light" ? "dark" : "light"
      }
    },
    components: {
      Menu
    }
  }

</script>

<style>

</style>