<template>
  <div class="container_fluid">
    <div class="container_title">
      <h1>הגידולים שלי</h1>
    </div>

    <div class="container_content">
      <div class="container_content_details">
        <div class="container_content_details_title"><span>סוג גידול:</span><br>זית א</div>
        <div class="container_content_details_kind"><span>זן:</span><br>סורי</div>
        <div class="container_content_details_dateStart"><span>תאריך התחלה:</span><br>30/03/2019</div>
        <div class="container_content_details_dateFinish"><span>תאריך סיום משוער:</span><br>01/10/2019</div>
        <div class="container_content_details_areaSize"><span>גודל שטח:</span><br>47 דונם</div>
        <div class="container_content_details_btnEdit"><a class="btn-floating cyan pulse"><i class="material-icons">edit</i></a></div>

      </div>
      <div class="container_content_btn">
          <button class="button">השקיה</button>
          <button class="button">דישון</button>
          <button class="button">הדברה</button>
          <button class="button">היסטוריה גידול</button>
      </div>
      <div class="container_content_btndel">
          <button class="button">מחק</button>
      </div>
      
    </div>

    <div class="container_list">
      <div class="container_list_title">
        <h5>בחר גידול</h5>
      </div>
      <div
        class="container_list_item"
        v-for="(Crop, index) in Crops"
        :key="Crop.id"
        :style="{ background: changbackground(index) }"
      >
        <div class="container_list_item_img">
          <span class="dot"
            ><h4>{{ FirstLetter(Crop.titel) }}</h4></span
          >
        </div>
        <div class="container_list_item_title">{{ Crop.titel }}</div>
        <div class="container_list_item_Description">
          {{ Crop.Description }}
        </div>
      </div>
    </div>

    <div class="container_add">
      <addCrop />
    </div>
  </div>
</template>

<script>
const fb = require('@/fb.js')
import addCrop from './AddCrop'

export default {
  name: 'MyCrops',
  components: { addCrop },
  data() {
    return {
      Crops: [
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 1 },
        { titel: 'אבטיח', Description: 'שדה 1,20 דונם', id: 2 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 3 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 4 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 5 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 6 },
        { titel: 'אבטיח', Description: 'שדה 1,20 דונם', id: 7 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 8 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 9 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 10 }
      ]
    }
  },
  mounted() {
    console.log(fb.currentUser)
  },
  methods: {
    FirstLetter(string) {
      return string.charAt(0).toUpperCase()
    },
    changbackground(index) {
      return index % 2 == false ? '#e2e2e2' : '#fafafa'
    }
  }
}
</script>

<style scoped>
.container_fluid {
  display: grid;
background-color: #74A748;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;
  padding: 15px;
  height:90vh;
}

      .container_title {
       
        grid-column: 1/6;
        height: 100%;
        text-align: center;
        
      }
                .container_title h1 {
                  margin: 0;
                }

      .container_list {
        grid-row: 2/4;
        width: 100%;
        min-width: 200px;
        height: 100%;
        border: 1px solid;
        overflow: auto;
        background-color:snow;
        box-shadow: 5px 10px 8px #888888;
        
      }


           .container_list_title {
            width: 95%;
            height: 40px;
            margin: 10px 0 10px 0;
            text-align: center;
            
            }
                      .container_list .container_list_title h5 {
                        margin: 0;
                      }

            .container_list_item {
             height: 75px;
             display: grid;
             grid-template-columns: repeat(3, 1fr);
             margin: 5px auto;
             border-style: solid;
             border-radius: 30px;
             box-shadow: 10px 5px 5px 0px rgba(0, 0, 0, 0.75);
             margin-bottom: 15px;
             padding: 5px;
            }
                    .container_list_item_img {
                      grid-column: 1/1;
                      grid-row: 1/3;
                    }
                    .container_list_item_title {
                      grid-column: 2/4;
                    }
                          
                    .container_list_item_Description {
                      grid-column: 2/4;
                    }

                    
                    .dot {
                      height: 58px;
                      width: 58px;
                      background-color: #bbb;
                      border-radius: 50%;
                      display: inline-block;
                      margin: 3%;
                      font-size: 40px;
                      margin-right: 10px;
                    }
                    .dot h4 {
                      margin-right: 33%;
                      margin-top: 15%;
                    }

      .container_add {
        width: 100%;
        height: 100%;
        border: 1px solid;
background-color:snow;
        box-shadow: 5px 10px 8px #888888;
      }
      .container_content {
        grid-column: 2/6;
        grid-row: 2/5;
        border: 1px solid;
        box-shadow: 5px 10px 8px #888888;
        height: 100%;
        background-color:snow;

        display: grid;
        grid-template-columns: repeat(5, 1fr);

      }

                  .container_content_details{

                  grid-column: 1/4;
                  
                  padding: 20px;
                  padding-top: 20px;
                  display: grid;
                  
                    grid-template-columns: repeat(4, 1fr);
                  }
                      .container_content_details span{
                                  font-size: 20px;
                                }
                                .container_content_details_title{
                                  grid-column: 1/5;
                                
                                height: 80%;
                                
                                }
                                .container_content_details_kind{
                                    grid-column: 1/5;
                               
                                height: 80%;
                                
                                }
                                
                                .container_content_details_dateStart{
                                    grid-column: 1/3;
                                
                               height: 80%;
                                }
                                .container_content_details_dateFinish{
                                    grid-column: 3/5;
                                
                                height: 80%;
                                }
                                .container_content_details_areaSize{ 
                                grid-column: 1/5;
                                
                                height: 80%;
                                }
                                .container_content_details_btnEdit{
                                  grid-column: 1/5;
                                

                                height: 80%;
                                }
                                
                                    
                                    


      .container_content_btn{
      grid-column: 4/4;
      padding: 20px;
      margin-top:50px;
     
      }
                             .container_content_btn .button {
                            background-color: #4CAF50; /* Green */
                            border: 1px solid green;
                            color: white;
                            padding: 5% 10%;
                            text-align: center;
                            text-decoration: none;
                            font-size: 100%;
                            cursor: pointer;
                            margin-bottom: 40px;
                            width: 100%;
                            display: block;
                          }

                          .container_content_btn .button:not(:last-child) {
                            border-bottom: none; /* Prevent double borders */
                          }

                         .container_content_btn .button:hover {
                            background-color: #3e8e41;
                          }




      .container_content_btndel{
      grid-column: 5/6;
      margin-top:50px;
      padding: 20px;
      }
                .container_content_btndel .button {
                            background-color: rgb(248, 16, 8); /* Green */
                            border: 1px solid rgb(7, 8, 7);
                            color: white;
                            padding: 5% 10%;
                            text-align: center;
                            text-decoration: none;
                            font-size: 100%;
                            cursor: pointer;
                            margin-bottom: 40px;
                            width: 100%;
                            display: block;
                          }

                          .container_content_btn .button:not(:last-child) {
                            border-bottom: none; /* Prevent double borders */
                          }

                         .container_content_btn .button:hover {
                            background-color:rgb(248, 16, 8);
                          }





</style>
