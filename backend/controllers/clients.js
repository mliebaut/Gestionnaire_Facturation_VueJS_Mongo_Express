const Client = require('../models/Client')

//contrôleur de la route GET /clients
exports.getList = (req, res) => {
  // on interroge la base de donnée
  Client.find().then((clients) => {
    // si il a des données, on les renvoie en JSON
    res.status(200).json(clients)
    // en cas d'erreur on capture le message d'erreur pour l'aficher dans la réponse en JSON
  }).catch(error => res.status(400).json({ error }))

}

//contrôleur de la route GET /clients/:id
exports.getItem = (req, res) => {
  // on interroge la base de donnée
  Client.findOne({
    _id: req.params.id
  }).then((client) => {
    // si il a des données, on les renvoie en JSON
    res.status(200).json(client)
    // en cas d'erreur on capture le message d'erreur pour l'aficher dans la réponse en JSON
  }).catch(error => res.status(400).json({ error }))
}

//contrôleur de la route POST /clients/
exports.postItem = (req, res) => {
  // console.log(req.body)
  // on fait des vérifications sur la donnée passée dans le body
  if(!req.body.lastname || !req.body.firstname || !req.body.society || !req.body.date) {
    // si il y a une erreur on interrompt l'opération...
    res.status(400).json({ error: 'Les paramètres Nom, Prénom, Entreprise et Date d\'ajout sont obligatoires.' })
  }
  
  //si tout va bien
  //on crée un nouveau document Mongo avec le model Client
  const client = new Client({
    ...req.body //ici on passe les données envoyées dans le client de la requête post
  })
  
  //sauvegarde en BDD, retourne la donnée sauvegardée
  client.save().then(() => {

    // retourne la réponse au format JSON
    //le status code 201 indique que la ressource a bien été créée
    res.status(201).json({
      message: 'Client crée !'
    })
  // en cas d'erreur à l'enregistrement en BDD...
  }).catch(error => res.status(400).json({ error }))
}

//contrôleur de la route PATCH /clients/:id
exports.patchItem = (req, res) => {
  const id = req.params.id
  const client = req.body

  Client.findByIdAndUpdate( {_id: id }, client, (err, clientUpdated) => {
    if (err) res.status(400).json(err)
    else  res.status(201).json(clientUpdated)
  } )
}

//contrôleur de la route PUT /clients/:id
exports.putItem = (req, res) => {
  const id = req.params.id
  const client = req.body

  Client.updateOne( {_id: id }, client).then(()=>{
    res.status(201).json({
      message: 'Client mis à jour'
    })
  })
}

//contrôleur de la route DELETE /clients/:id
exports.deleteItem = (req, res) => {
  // on interroge la base de donnée
  Client.deleteOne({
    _id: req.params.id
  }).then((client) => {
    // si le client est trouvé, on le supprime, puis renvoie un message de confirmation
    res.status(201).json({
      message: 'Client supprimé'
    })
    // en cas d'erreur on capture le message d'erreur pour l'aficher dans la réponse en JSON
  }).catch(error => res.status(400).json({ error }))
}