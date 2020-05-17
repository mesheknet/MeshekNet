<template>
  <div class="container_fluid">

      <div class="container_title">
       <h1>הגידולים שלי</h1>
      </div>

      <div class="container_content">
       content
        </div>
       <div class="container_list">
           list
           <div class="container_list_title">
               <h5> בחר גידול:</h5>
               </div>
           <div class="container_list_item">
               item
               </div>
       
      </div>
      
     
      <div class="container_add">
       add
      </div>
      

  
  </div>
</template>

<script>
const fb = require('@/fb.js')

export default {
  name: 'MyCrops',
  currentUser: null,
  data() {
    return {}
  },
  mounted() {
    console.log(fb.currentUser)
  }
}
</script>



<style scoped>

.container_fluid{
   display: grid;
   border-style: solid;
   grid-template-columns: repeat(3,1fr);
   grid-gap: 1em;
 
}

.container_title{
    border-style: solid;
  grid-column: 1/4;
  height: 100px;
  margin-top: 20px;
    text-align: center;
}
.container_title h1{
    margin: 0;
}
.container_title h1{
    margin: 0;
}

.container_list{
   grid-column: 1/1 ;
   grid-row: 2/4;
      border-style: solid;
      height: 500px;

}

.container_add{
  grid-column: 1/1;
  height: 80px;
   border-style: solid;
   
}
.container_content{
  grid-column: 2/4;
  grid-row: 2/5;
   border-style: solid;
}
.container_list_title{
    width: 95%;
    height:40px;
   
 margin:15px auto;
     border-style: solid;
}
.container_list_item{
width: 95%;
height: 75px;

    margin:5px auto;
     border-style: solid;
}
.container_list .container_list_title h5{
    margin: 0;
}

</style>
