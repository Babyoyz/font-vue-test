<template>
<div>
    <v-data-table
    :headers="headers"
    :items="arrayresult"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>CRUD DATA</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.Name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.Email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <div class="">
                        <label for="gender">Male</label>
                            <input type="radio"  class="radiocheck" id="gender1" name="genderselect" v-if="editedItem.Gender == 1" checked :value="'1'" v-model="editedItem.Gender">
                            <input type="radio"  class="radiocheck" id="gender1" name="genderselect" v-else :value="'1'" v-model="editedItem.Gender">

                        <label for="gender">FeMale</label>
                      <input type="radio"  class="radiocheck" id="gender2" name="genderselect" v-if="editedItem.Gender == 2" checked :value="'2'" v-model="editedItem.Gender">
                      <input type="radio"  class="radiocheck" id="gender2" name="genderselect" v-else checked :value="'2'" v-model="editedItem.Gender">

                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                  <v-select
                    v-model="selectter"
                    :items="items"
                    item-text="state"
                    item-value="abbr"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
        <template v-slot:item.indexs="{ item }">
         {{ arrayresult.indexOf(item)+1 }}
    </template>
       <template v-slot:item.Gender="{ item }">
           <p v-if="item.Gender == 1">Male</p>
           <p v-else>FeMale</p>
    </template>
          <template v-slot:item.Position="{ item }">
              <div v-if="item.Position == 1">
                   <v-chip
                    class="ma-2"
                    color="orange"
                    >
                    IOS Devloper
                    </v-chip>
              </div>
               <div v-else-if="item.Position == 2">
                   <v-chip
                    class="ma-2"
                    color="purple"
                    >
                    PHP Devloper
                    </v-chip>
              </div>
                <div v-else>
                   <v-chip
                    class="ma-2"
                    color="gay"
                    >
                   Java Devloper
                    </v-chip>
              </div>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
        <p>No DATA</p>
    </template>
  </v-data-table>
</div>


</template>

<script>
export default {
  name: "DataTable",
  props: {
    msg: String,
    arrayresult:Array
  },
  data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'No',
          align: 'center',
          sortable: true,
          value: 'indexs',
        },
        { text: 'Name', value: 'Name' },
        { text: 'Email', value: 'Email' },
        { text: 'Gender', value: 'Gender' },
        { text: 'Position', value: 'Position' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
     selectter: { state: 'IOS Devloper', abbr: ' 1' },
        items: [
          { state: 'IOS Devloper', abbr: '1' },
          { state: 'PHP Devloper', abbr: '2' },
          { state: 'Java Devloper', abbr: '3' },
        ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        Name: '',
        Email: '',
        Gender: '',
        Position: '',
        Actions: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    methods: {
      editItem (item) {
       

         this.selectter = this.items.find(element => element.abbr == item.Position);

        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem)
            this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
          this.$emit('removedata',this.editedItem)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {

          if(this.editedItem.Name != ''){

                if(this.editedItem.Email != ''){

                        if(this.editItem.Gender != ''){

                            if(this.editItem.Position != ''){

                                    this.editedItem.Position = this.selectter.abbr
                                      this.$emit('editdata',this.editedItem)
                                        this.close()

                            }else{
                            Swal.fire(
                                        'warning',
                                        'Plase SelectPosition',
                                        'warning'
                                        ) 

                            }
                        }else{
                    Swal.fire(
                                'warning',
                                'Plase Select Gender',
                                'warning'
                                ) 

                        }
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
    },
};
</script>

<style  scoped>
.radiocheck{
    border-radius: 50%;
    cursor: pointer;
    height: 20px;
    width: 20px;
}
</style>