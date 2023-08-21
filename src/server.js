require('dotenv').config();
const { db } = require('./database/config');
const app = require('./app');
const initModel = require('./models/initModel');

db.authenticate()
  .then(() => console.log('Database Connected 💻'))
  .catch((err) => console.log(err));

initModel();

db.sync({ force: false })
  .then(() => console.log('Database Syncronized ✅'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up un port ${PORT}`);
});
