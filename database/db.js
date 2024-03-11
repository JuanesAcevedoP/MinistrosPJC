const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/minisPJC') 
  .then(db => console.log('Database MongoDB - minisPJC connected ...'))
  .catch(err => console.log(err));
   