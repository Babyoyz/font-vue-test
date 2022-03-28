<template>
    <div>
<v-text-field
      label="Name"
      required
      v-model="Name"
    ></v-text-field>

    <v-text-field
      label="E-mail"
      v-model="Email"
     
    ></v-text-field>

    <v-radio-group v-model="radioGroup" row>
      <v-radio
        v-for="n in 2"
        :key="n"
        :label="n == 1 ?'Male':'FeMale'"
        :value="n"
      ></v-radio>
    </v-radio-group>

     <v-select
          v-model="select"
          :hint="`${select.state}`"
          :items="items"
          item-text="state"
          item-value="abbr"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>


    <div class="d-flex justify-center">
           <v-btn
      color="success"
      class="mr-4"
      @click="savedata"
    >
      Save
    </v-btn>
    </div>
 
    </div>
    
 
</template>

<script>
  export default {

      data(){
          return{
                 radioGroup: 1,
                select: { state: 'IOS Devloper', abbr: '1' },
                items: [
                { state: 'IOS Devloper', abbr: '1' },
                { state: 'PHP Devloper', abbr: '2' },
                { state: 'Java Devloper', abbr: '3' },
               
        ],
         Name:'',
         Email:'',
          }
      },
    methods: {
        savedata(){

           let validateEmail =  this.validateEmail(this.Email)

            if(this.Name != ''){

                if(validateEmail != null){

                   let json = {
                          "Name":this.Name,
                            "Email": this.Email,
                            "Gender":this.radioGroup,
                            "Position":this.select.abbr
                   }
                       this.$emit('insertdata',json)
                }else{
                Swal.fire(
                'warning',
                'Plase input Email',
                'warning'
                ) 
                }
            }else{
     Swal.fire(
                'warning',
                'Plase input Name',
                'warning'
                ) 

            }
            
        },
          validateEmail (email)  {
            return String(email)
                .toLowerCase()
                .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            }
    },
  }
</script>


<style scoped>

</style>
