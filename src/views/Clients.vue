<template>
  <div>
    <b-container>
      <b-row class="mt-5">
        <b-col>
          <h1 class="h3">
            <i class="fas fa-angle-down text-muted mr-2" />
            Liste des clients
          </h1>
          <p class="text-muted mb-0">Page: {{currentPage}}/{{totalPages}} - {{ rows }} résultats</p>
        </b-col>
        <b-col class="d-flex justify-content-end align-items-end">
          <b-button variant="light" class="mr-2" to="/editclient/0"><i class="fas fa-plus circle mr-2" />Ajout d'un client</b-button>
          <b-button variant="light" to="/editclient/0"><i class="fas fa-plus circle mr-2" />Ajout d'une facture</b-button>
        </b-col>
      </b-row>
      <hr>

      <b-card class="shadow p-3">
         <b-table
          id="clients-table"
          :current-page="currentPage"
          :per-page="perPage"
          stacked="lg"
          :fields="fields"
          :items="clients">
          
           <template #cell(lastname)="row">
              {{row.item.firstname }} {{row.item.lastname }}
            </template> -->

          
            <template #cell(actions)="row">
              <b-button variant="light" size="md" :to="{ name: 'edition-client', params: { id: row.item._id } }">
                <i class="fa-fw fas fa-pen mr-2 text-primary" /> Modifier
              </b-button>
            </template>
          
          </b-table> 

        <b-pagination 
          class="mt-4"
          align="center"
          v-model="currentPage"
          :per-page="perPage"
          :total-rows="rows"
          aria-controls="clients-table"
          />
      </b-card>

      <b-form-checkbox class="my-4" v-model="debug" name="debug" switch>Debug</b-form-checkbox>

      <pre v-if="debug" class="debug card border-primary bg-dark text-light p-4">{{ clients }}</pre>

    </b-container>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'


  export default {
    name: 'Clients',
    data(){
      return {
        debug: true,
        perPage: 2,
        currentPage: 1,
        fields: [
          {
            key: 'lastname',
            label: 'Nom',
            class: 'cell-name',
            sortable: true
          },
          {
            key: 'society',
            label: 'society',
            class: 'cell-society',
            sortable: true,
          },
          {
            key: 'date',
            label: 'Date d\'ajout',
            class: 'cell-date',
            sortable: false,
          },
          {
            key: 'actions',
            label: 'Actions',
            class: 'cell-actions',
            sortable: false
          }
        ]
      }
    },
    computed: {
      // avec la methode vuex mapState() on récupère bills depuis le module bill du state
      ...mapState({
         clients: state => state.client.clients
      }),
      totalPages(){
        return Math.ceil( this.rows / this.perPage )
      },
      rows(){
        return this.clients.length
      }
    },
    methods: {
      ...mapActions('client', ['getClients']),

    },
      created() {
        // pour déclencher le console log, on attend la réponse du serveur (il faut retourner la promesse depuis le store)
        this.getClients().then(() => {
          console.log('liste mise à jour')
      })
    }
  }
</script>

<style scoped>

</style>