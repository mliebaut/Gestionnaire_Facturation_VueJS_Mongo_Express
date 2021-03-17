<template>
  <!-- template du composant (HTML) -->
  <b-container id="app">
    <b-row>
      <b-col>
        <h3><i class="fas fa-angle-down text-muted mr-2" />{{ form._id ? 'Editer':'Créer' }} un Client</h3>
        <hr />
      </b-col>
    </b-row>

    <b-card class="shadow p-3" >
      <h4 class="pb-2">
        <i class="fas fa-info"></i>
        Informations contact
      </h4>
      <hr>

      <b-row>
        <b-col lg="4">

          <b-form-group
            id="fieldset-firstname"
            label="Prénom"
            label-cols-lg="4"
            content-cols-lg="8"
            label-for="firstname"
          >
          <b-form-input id="firstname" v-model="form.firstname" />
          </b-form-group>

          <b-form-group
            id="fieldset-function"
            label="Fonction"
            label-cols-lg="4"
            content-cols-lg="8"
            label-for="function"
          >
          <b-form-input id="function" v-model="form.function" />
          </b-form-group>

        </b-col>

        <b-col lg="4">

          <b-form-group
            id="fieldset-lastname"
            label-cols-md="4"
            content-cols-md="8"
            label="Nom"
            label-for="lastname"
          >
          <b-form-input id="lastname" v-model="form.lastname"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-phone"
            label-cols-md="4"
            content-cols-md="8"
            label="Téléphone"
            label-for="phone"
          >
          <b-form-input id="phone" v-model="form.phone"></b-form-input>
          </b-form-group>

        </b-col>

        <b-col lg="4">

          <b-form-group
            id="fieldset-date"
            label="Date d'ajout"
            label-cols-lg="4"
            content-cols-lg="8"
            label-for="date"
          >
            <b-form-datepicker 
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              id="date"
              v-model="form.date" />
          </b-form-group>

        </b-col>
        
      </b-row>

      <b-row>
        <b-col lg="12" >
          <b-form-group
            id="fieldset-email"
            label-cols-md="4"
            content-cols-md="8"
            label="Email"
            label-for="email"
          >
            <b-form-input id="email" v-model="form.email"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="12" >
          <b-form-group
            id="fieldset-society"
            label-cols-md="4"
            content-cols-md="8"
            label="Entreprise"
            label-for="society"
          >
            <b-form-input id="society" v-model="form.society"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>      

      <h4 class="pb-2">
        <i class="fas fa-address-card"></i>
        Coordonnées
      </h4>
      <hr>

      <b-row>
        <b-col lg="12" >
          <b-form-group
            id="fieldset-firstaddress"
            label-cols-md="4"
            content-cols-md="8"
            label="Adresse 1"
            label-for="firstaddress"
          >
            <b-form-input id="firstaddress" v-model="form.firstaddress"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="12" >
          <b-form-group
            id="fieldset-secondaddress"
            label-cols-md="4"
            content-cols-md="8"
            label="Adresse 2"
            label-for="secondaddress"
          >
            <b-form-input id="secondaddress" v-model="form.secondaddress"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>  

      <b-row>
        <b-col lg="4">

          <b-form-group
            id="fieldset-postalcode"
            label="Code Postal"
            label-cols-lg="4"
            content-cols-lg="8"
            label-for="postalcode"
          >
            <b-form-input id="postalcode" v-model="form.postalcode" />
          </b-form-group>

        </b-col> 

        <b-col lg="4">
          <b-form-group
            id="fieldset-city"
            label="Ville"
            label-cols-lg="4"
            content-cols-lg="8"
            label-for="city"
          >
          <b-form-input id="city" v-model="form.city" />
          </b-form-group>

        </b-col>
        <b-col lg="4">
          <b-form-group
            id="fieldset-country"
            label="Pays"
            label-cols-lg="4"
            content-cols-lg="8"
            label-for="country"
          >
          <b-form-input id="country" v-model="form.country" />
          </b-form-group>
        </b-col>
      </b-row>   

      <b-row>
        <b-col>
          <b-button variant="danger" @click="onDeleteClient()">Supprimer</b-button>
        </b-col>
        <b-col class="text-right">
          <b-button variant="primary" @click="onSaveClient()">Enregister</b-button>
        </b-col>
      </b-row>              

    </b-card>
<!-- 
    <b-form-checkbox class="my-4" v-model="debug" name="debug" switch>Debug</b-form-checkbox> -->
<!-- 
    <pre v-if="debug" class="debug card border-primary bg-dark text-light p-4">
      Form: {{ form }}
      Client (du store): {{ client }}
    </pre> -->

  </b-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'


const newClient = {

  firstname: '',
  lastname: '',
  phone: '',
  function: '',
  email: '',
  society: '',
  date: new Date(),
  firstaddress: '',
  secondaddress: '',
  postalcode: '',
  country: '',
  city: '',  
}

// controleur du composant
export default {
  name: 'EditClient',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  //data dans un composant Vue doit être une fonction qui retourne un objet
  data() {
    return {
      debug: false,

      form: {}
    }
  },
  computed: {
    ...mapState({
      client: state => state.client.client
    }),
  },
  methods: {
    // mapActions permet d'accéder directement aux actions du store depluis un composant
    //map this.getBill(data) avec this.$store.dispatch('bill/getBill', data)
    ...mapActions('client', ['getClient', 'saveClient', 'deleteClient']),
    

    onDeleteClient(){

      // on appelle la méthode du store (grâce à mapActions)
      //on pourrait également appeler this.$store.dispatch('bill/deleteBill', this.form.id)
      this.deleteClient(this.form._id)
      
      //une fois la donnée enregistrée dans le store 
      //je redirige l'utilisateur vers la liste avec le router
      this.$router.push({ name: 'clients' })
    },

    onSaveClient(){
      
      // on appelle la méthode du store (grâce à mapActions)
      //on pourrait également appeler this.$store.dispatch('bill/saveBill', this.form)
      this.saveClient( this.form ).then(()=> {
        //une fois la donnée enregistrée dans le store 
        //je redirige l'utilisateur vers la liste avec le router
        this.$router.push({ name: 'clients' })  
      })
    }
  },
  created() {
    //se déclenche à l'instantiation du composant
    //en fait dès qu'on arrive sur la route editbill
    if(!this.id || this.id == 0 || this.id == -1) {
      this.form = { ...newClient }
    } else {
      this.getClient(this.id).then(()=>{
        this.form = this.client
      })
    }
  }
}
</script>
