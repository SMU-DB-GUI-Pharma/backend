const express = require('express');
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
res.send('HELLO WORLD!');
});
  

//Connect to MySQL
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "mysqldockerexample_mysql_1",
  port: "3306",
  user: "exampleuser",
  password: "password",
  database: "classicmodels"
});


//Open Connection
con.connect(function(err) {
	  if (err) throw err;
});


// ROUTES FOR  API

// create router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

/////////products{productCode}

// GET
router.get('/product/:productCode', function (req, res) {
	var productCode = req.param('productCode');
	con.query("SELECT * FROM products WHERE productCode = (?)", productCode, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
	
});

//DELETE
router.delete('/product/:productCode', async (req, res) => {
	var productCode = req.param('productCode');
	con.query("DELETE FROM products WHERE productCode = (?) ", productCode, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});
	
//PUT
router.put('product/:productCode/put:quantity', async (req, res) => {
	var productCode = req.param('productCode');
	var quantityInStock = req.param('quantityInStock');
	con.query("UPDATE products SET quantityInStock = (?) WHERE productCode = (?) ", [productCode, quantityInStock], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
	
});
	
/////////products

router.get('/products', function (req, res) {
	con.query("SELECT * FROM products", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
	
});

router.post('/products', async (req, res) => {
	var prod = req.param('prod');
	con.query("INSERT INTO products (productCode) VALUES (?)", prod,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

/////////payments

router.get('/payments', function (req, res) {
	con.query("SELECT * FROM payments", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
	
});

router.post('/payments', async (req, res) => {
	var custNum = req.param('custNum');
	var checkNum = req.param('checkNum');
	var payDate = req.param('payDate');
	var payAmount = req.param('payment');
	con.query("INSERT INTO payments (customerNumber, checkNumber, paymentDate, amount) VALUES (?, ?, ?, ?)", 
	[custNum, checkNum, payDate, payAmount],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// POST
// /api/postit
router.post('/postit', async (req, res) => {
  var id = req.param('id');
  
	con.query("INSERT INTO t1 (col_int) VALUES (?)", id,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// PUT
// /api/putit
router.put('/putit', async (req, res) => {
  var id = req.param('id');
  //http://localhost:8080/api/putit?id=dog
	con.query("UPDATE t1 SET col_int = 400 WHERE col_varchar = (?) ", id,function (err, result, fields) {
		if (err) throw err;
		//console.log(result);
		res.end(JSON.stringify(result)); 
	});
});

// DELETE - make sure to change request type, value
// /api/deleteit
router.delete('/deleteit', async (req, res) => {
  var id = req.param('id');
	//http://localhost:8080/api/deleteit?id=35
	con.query("DELETE FROM t1 WHERE col_int = ? ", id,function (err, result, fields) {
		if (err) 
			return console.error(error.message);
		res.end(JSON.stringify(result)); 
	  });
});

// REGISTER  ROUTES -------------------------------
app.use('/api', router);

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


