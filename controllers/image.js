const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'cf1b35ea073541ae96f1ee3291b9d347'
 });

const handleApiCall = (req, res) => {
  app.models
    .predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}


const handleImage = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries'))

  // let found = false;
  // database.users.forEach(user => {
  //   if(user.id === id) {
  //    found = true;
  //    user.entries ++;
  //    return res.json(user.entries);
  //   }
  // })
  // if (!found){
  //   res.status(404).json('no such user');
  // }
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
};