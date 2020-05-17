<template>
  <div class="container_fluid">

      <div class="container_title">
       <h1>הגידולים שלי</h1>
      </div>

      <div class="container_content">
       content
        </div>
       <div class="container_list">
           
           <div class="container_list_title">
               <h5> בחר גידול:</h5>
               </div>
           <div class="container_list_item">
             
               <div class="container_list_item_img">
                    
                </div>
               <div class="container_list_item_title">

                    </div>
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
   padding: 15px;
 
}

.container_title{
    border-style: solid;
  grid-column: 1/4;
  height: 100px;
  
    text-align: center;
}
.container_title h1{
    margin: 0;
}
.container_title h1{
    margin: 0;
}

.container_list{
   
   grid-row: 2/4;
      
      height: 500px;
       border: 1px solid;
 
  box-shadow: 5px 10px 8px #888888;

}

.container_add{
  
  height: 80px;
   border: 1px solid;
 
  box-shadow: 5px 10px 8px #888888;
   
}
.container_content{
  grid-column: 2/4;
  grid-row: 2/5;
  
   border: 1px solid;
 
  box-shadow: 5px 10px 8px #888888;
   
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
.container_list_item_img{
    margin-top: 4px;
    margin-right: 2px;
    height: 90%;
    width: 15%;
    border-style: solid;
}


.container_list .container_list_title h5{
    margin: 0;
}

</style>
