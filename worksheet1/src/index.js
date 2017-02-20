import express from 'express';
import morgan from 'morgan';
import massive from 'massive';
import http from 'http';

const connectionString = "postgres://localhost/pgguide";
const app = express();
app.use(morgan('combined'));

// connect to Massive and get the db instance. You can safely use the
// convenience sync method here because its on app load
// you can also use loadSync - it's an alias
const massiveInstance = massive.connectSync({connectionString : connectionString})

app.get('/users/:id', (req, res) => {
    const db = app.get('db');
    db.users.find({id: req.params.id}, (err, users) => {
      if (users.length > 0) {
          res.send(users[0]);
      } else {
          res.status(404).send("Not found");
      }
    });
});

app.get('/users', (req, res) => {
    const db = app.get('db');
    db.users.find((err, users) => {
      res.send(users);
    });
});

app.get('/products/:id', (req, res) => {
    const db = app.get('db');
    db.products.find({id: req.params.id}, (err, products) => {
      if (products.length > 0) {
        res.send(products[0]);
      } else {
        res.status(404).send("Not found");
      }
    });
});

app.get('/products', (req, res) => {
    const db = app.get('db');
    db.products.find((err, products) => {
      res.send(products);
    });
});

app.get('/purchases/:id', (req, res) => {
    const db = app.get('db');
    db.purchases.find({id: req.params.id}, (err, purchases) => {
      if (purchases.length > 0) {
        res.send(purchases[0]);
      } else {
        res.status(404).send("Not found");
      }
    });
});

app.get('/purchases', (req, res) => {
    const db = app.get('db');
    db.purchases.find((err, purchases) => {
      res.send(purchases);
    });
});

// Set a reference to the massive instance on Express' app:
app.set('db', massiveInstance);
http.createServer(app).listen(3000);
