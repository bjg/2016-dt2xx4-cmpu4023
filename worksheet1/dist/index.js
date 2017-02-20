'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _massive = require('massive');

var _massive2 = _interopRequireDefault(_massive);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = "postgres://localhost/pgguide";
var app = (0, _express2.default)();
app.use((0, _morgan2.default)('combined'));

// connect to Massive and get the db instance. You can safely use the
// convenience sync method here because its on app load
// you can also use loadSync - it's an alias
var massiveInstance = _massive2.default.connectSync({ connectionString: connectionString });

app.get('/users/:id', function (req, res) {
  var db = app.get('db');
  db.users.find({ id: req.params.id }, function (err, users) {
    if (users.length > 0) {
      res.send(users[0]);
    } else {
      res.status(404).send("Not found");
    }
  });
});

app.get('/users', function (req, res) {
  var db = app.get('db');
  db.users.find(function (err, users) {
    res.send(users);
  });
});

app.get('/products/:id', function (req, res) {
  var db = app.get('db');
  db.products.find({ id: req.params.id }, function (err, products) {
    if (products.length > 0) {
      res.send(products[0]);
    } else {
      res.status(404).send("Not found");
    }
  });
});

app.get('/products', function (req, res) {
  var db = app.get('db');
  db.products.find(function (err, products) {
    res.send(products);
  });
});

app.get('/purchases/:id', function (req, res) {
  var db = app.get('db');
  db.purchases.find({ id: req.params.id }, function (err, purchases) {
    if (purchases.length > 0) {
      res.send(purchases[0]);
    } else {
      res.status(404).send("Not found");
    }
  });
});

app.get('/purchases', function (req, res) {
  var db = app.get('db');
  db.purchases.find(function (err, purchases) {
    res.send(purchases);
  });
});

// Set a reference to the massive instance on Express' app:
app.set('db', massiveInstance);
_http2.default.createServer(app).listen(3000);
//# sourceMappingURL=index.js.map