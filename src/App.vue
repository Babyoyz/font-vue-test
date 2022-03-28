<template>
  <div id="app">
      <v-app>
          <v-container>
              <center>
                    <div class="mb-20">
                    <InsertData @insertdata="insert_customer" />
                </div>
              </center>
             <DataTable :arrayresult="array" @editdata="editdata_customer" @removedata="remove_customer" />
          </v-container>
      </v-app>
  </div>
</template>

<script>
import DataTable from "./components/DataTable.vue";
import InsertData from "./components/InsertData.vue";

import axios from 'axios'
export default {
  name: "App",
  components: {
    DataTable,
    InsertData
  },
    data(){
        return{
            array:[]
        }
    },
    created(){
        this.callgetdata()
    },
    methods:{
        callgetdata(){

            axios.get('http://localhost:5000/getcustomer')
                .then(({data}) => {
              
                    this.array = data
                })
                .catch((err) => {
                    console.error(err)
                })
        },
        async editdata_customer(params){

            const { data } = await axios.put('http://localhost:5000/updatecustomer',{
                      ...params
            })

            if(data.statuscode == 200){

                  Swal.fire(
                'Good job!',
                'Update data Success',
                'success'
                ) 
            this.callgetdata()
            }
          
        },
        async remove_customer(params){
              
                const { data } = await axios.post('http://localhost:5000/deletecustomer',{
                      ID:params.ID
            })
            
               if(data.statuscode == 200){

                  Swal.fire(
                'Good job!',
                'Delete data Success',
                'success'
                ) 
            this.callgetdata()
            }
          
        },
        async insert_customer(params){

                      const { data } = await axios.post('http://localhost:5000/insertcustomer',{
                      ...params
            })
             
               if(data.statuscode == 200){

                  Swal.fire(
                'Good job!',
                'Insert data Success',
                'success'
                ) 
            this.callgetdata()
            }

        }
    }
};
</script>
<style scoped>
.mb-20{
    margin-bottom: 3rem;
    max-width: 600px;
}

</style>

