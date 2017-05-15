const express = require('express');
const bodyParser = require('body-parser');
const UserSchema = require('./models/user');
const config = require('../config/index.json');

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;

require('./models').connect(config.dbUri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'API Initialized!' });
});

router.route('/registered')
  .get((req, res) => {
    UserSchema.find((err, user) => { // eslint-disable-line array-callback-return
      if (err) res.send(err);

      res.json(user);
    });
  })
  .post((req, res) => {
    const User = new UserSchema();
    User.username = req.body.username;
    User.password = req.body.password;
    User.terms = req.body.terms;

    User.save((err) => {
      if (err) res.send(err);
      res.json({ message: 'User registered!' });
    });
  });

router.route('/login')
  .post((req, res) => {
    // const User = new UserSchema();
    const username = req.body.username;
    const password = req.body.password;

    UserSchema.findOne({ username: new RegExp(username, 'i') }, (err, result) => { // eslint-disable-line consistent-return
      if (result) {
        if (username === result.username) {
          // test for a matching password
          console.log(password);
          return result.comparePassword(password, (passErr, isMatch) => { // eslint-disable-line consistent-return
            if (passErr) return res.send(passErr);
            // check if the password was a match
            if (isMatch) return res.json({ message: 'Logged In!' });
            res.json({ message: 'User or Password Incorrect!' });
          });
        }
      }
      if (err) res.json(err);

      res.json({ message: 'User or Password Incorrect!', result });
    });
  });

app.use('/api', router);

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});
