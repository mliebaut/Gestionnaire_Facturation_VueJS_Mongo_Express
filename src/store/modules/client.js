import Vue from 'vue'

const namespaced = true

const state = {
  client: {},
  clients: [
    {
        id: 1,
        lastname: 'Liebaut',
        firstname: 'Mélusine',
        function: 'bruh',
        phone: '0640884437',
        email: 'melusine.liebaut@gmail.com',
        society: 'ifa',
        firstAddress: '43 rue de la folie',
        secondAddress: 'je ne sais pas',
        postalCode: '57050',
        city: 'Metz',
        country: 'France',
        date: '2020-06-06'
    }
  ],
  loading: false
}

const mutations = {
  // met à jour l'état de client
  UPDATE_CLIENT(state, payload){
    state.client = payload
  },
  UPDATE_CLIENTS(state, payload){
    state.clients = payload
  },
  UPDATE_LOADING(state, payload){
    state.loading = payload
  }
}

const actions = {
  //permet de récupérer la liste des factures
  getClients({commit}) {
    commit('UPDATE_LOADING', true)
    //appel à la BDD (promise) 
    // on utilise return pour utiliser la promesse dans le composant
    return Vue.axios.get('/clients').then((response) => {
      // console.log(response.data)

      // on déclenche la mutation des données une fois le résultat récupéré
      commit('UPDATE_CLIENTS', response.data)
      commit('UPDATE_LOADING', false)
    })
    
  },
  //permet de récupérer les données d'une facture en fonction d'un id
  getClient({commit}, id) {
    commit('UPDATE_LOADING', true)
    //appel à la BDD (promise)
    return Vue.axios.get('/clients/'+ id).then((response) => {
      // console.log(response.data)
      // on déclenche la mutation des données une fois le résultat récupéré
      commit('UPDATE_CLIENT', response.data)
      commit('UPDATE_LOADING', false)
    })
  },

  //permet de récupérer les données d'une facture en fonction d'un id
  saveClient({commit}, payload) {

    commit('UPDATE_LOADING', true)
    //s'il y a un id, on modifie une facture existante
    if (payload._id) {
      //l'id de la bill qu'on veut enregistrer
      const id = payload._id
      
      return Vue.axios.patch(`/clients/${id}`, payload).then((response) => {
        // on déclenche la mutation des données une fois le résultat récupéré
        commit('UPDATE_CLIENT', response.data)
        commit('UPDATE_LOADING', false)
      })

    //sinon, création d'une nouvelle facture
    } else {
      return Vue.axios.post(`/clients`, payload).then((response) => {
        // on déclenche la mutation des données une fois le résultat récupéré
        commit('UPDATE_CLIENT', response.data)
        commit('UPDATE_LOADING', false)
      })
    }
  },

  deleteClient({commit}, id){
    commit('UPDATE_LOADING', true)
    //appel à la BDD (promise)
    
    return Vue.axios.delete('/clients/'+ id).then((response) => {
      
      console.log(response.data)
      commit('UPDATE_LOADING', false)
    })
  }
}

// les getters sont comme des computed values pour le store.state
const getters = {
  getTwoLatestClients: (state) => {
    return state.clients.slice(0, 1)
  }
}

export {
  namespaced,
  state,
  mutations,
  actions,
  getters
}