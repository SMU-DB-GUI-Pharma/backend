const express = require('express');
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
res.send('HELLO WORLD!');
});
  

//Connect to MySQL
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "mysqldockerexample_mysql_1", //Don't know what this should be
  port: "3306",
  user: "root",
  password: "pass",
  database: "MrPharma" //Data base name
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



//GET; return all of the prescription brands
router.get('/prescriptionBrand', function (req, res) {
	con.query("SELECT * FROM PrescriptionBrand", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//GET; return all of the insurances
router.get('/insurances', function (req, res) {
	con.query("SELECT * FROM Insurance", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//GET; return all of the Prescriptions
router.get('/prescriptions', function (req, res) {
	con.query("SELECT * FROM Prescription", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//GET; return all of the users
router.get('/users', function (req, res) {
	con.query("SELECT * FROM User", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//GET; for user/{username}, need to return their information
router.get('/user/:username', function (req, res) {
	con.query("SELECT * FROM user u where u.username = ?", [req.params.userName], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//GET; For getting all of payments
router.get('/payments', function (req, res) {
	con.query("SELECT * FROM payments", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//GET; For getting all of Pharmacy
router.get('/pharmacy', function (req, res) {
	con.query("SELECT * FROM pharmacy", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//GET; For getting a specific pharmacy
router.get('/pharmacy/:productCode', function (req, res) {
	con.query("SELECT * FROM pharmacy p WHERE p.pharmacyName = ?", [req.params.pharmacyName], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});



// POST; For adding a user
router.post('/users', async (req, res) => {  
	var querystring = `INSERT INTO User VALUES ('${con.escape(req.params.userName)}', '${con.escape(req.params.userPassword)}', '${con.escape(req.params.pinCode)}', '${con.escape(req.params.totalCostPrescriptions)}', '${con.escape(req.params.monthlyCost)}')`;
	con.query(querystring, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// POST; for adding a pharmacy
router.post('/pharmacy', async (req, res) => {  
	var querystring = `INSERT INTO pharmacy VALUES ('${con.escape(req.params.PharmacyName)}', '${con.escape(req.params.AddressLine1)}', '${con.escape(req.params.AddressLine2)}', '${con.escape(req.params.City)}', '${con.escape(req.params.State)}', '${con.escape(req.params.PostalCode)}', '${con.escape(req.params.Country)}', '${con.escape(req.params.Phone)}', '${con.escape(req.params.InsuranceID)}', '${con.escape(req.params.CodePin)}')`;
	con.query(querystring, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// POST; for adding a pharmacy brand
router.post('/pharmacyBrand', async (req, res) => {  
	var querystring = `INSERT INTO PharmacyBrand VALUES ('${con.escape(req.params.BrandName)}', '${con.escape(req.params.Description)}', '${con.escape(req.params.image)}')`;
	con.query(querystring, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// POST; for adding a prescription
router.post('/prescription', async (req, res) => {  
	var querystring = `INSERT INTO Prescription VALUES ('${con.escape(req.params.PrescriptionName)}', '${con.escape(req.params.StartDate)}', '${con.escape(req.params.isRefillable)}', '${con.escape(req.params.isRecurring)}', '${con.escape(req.params.PrescriptionDescription)}', '${con.escape(req.params.Comments)}', '${con.escape(req.params.BrandName)}', '${con.escape(req.params.EndDate)}', '${con.escape(req.params.BuyPrice)}', '${con.escape(req.params.RefillDate)}', '${con.escape(req.params.RefillCount)}', '${con.escape(req.params.PausePrescription)}', '${con.escape(req.params.code_pin)}')`;
	con.query(querystring, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// POST; for adding an insurance
router.post('/insurance', async (req, res) => {  
	var querystring = `INSERT INTO Insurance VALUES ('${con.escape(req.params.Company)}', '${con.escape(req.params.AddressLine1)}', '${con.escape(req.params.AddressLine2)}', '${con.escape(req.params.City)}', '${con.escape(req.params.State)}', '${con.escape(req.params.PostalCode)}', '${con.escape(req.params.Country)}', '${con.escape(req.params.PhoneNumber)}', '${con.escape(req.params.Email)}', '${con.escape(req.params.code_pin)}')`;
	con.query(querystring, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});


//Need to work on the rest of stuff below

// POST
// /api/postit
// for payments, need to add a new payment
router.post('/payments',async (req, res) => {
	var querystring = `INSERT INTO payments VALUES ('${con.escape(req.params.customerNumber)}', '${con.escape(req.params.checkNumber)}', '${con.escape(req.params.paymentDate)}', '${con.escape(req.params.amount)}')`;
	  con.query(querystring, function (err, result, fields) {
		  if (err) throw err;
		  res.end(JSON.stringify(result)); // Result in JSON format
	  });
  });

// PUT
// /api/putit
// for product/{productCode}, need to setQuantity in stock
router.put('/product/:productCode', async (req, res) => {
  var pCode = `UPDATE products SET quantityInStock = ('${con.escape(req.params.quantityInStock)}') WHERE productCode = ('${con.escape(req.params.productCode)}') `;
  
	con.query(pCode, function (err, result, fields) {
		if (err) throw err;
		//console.log(result);
		res.end(JSON.stringify(result)); 
	});
});

// DELETE
// /api/deleteit
// for product/{productCode}, need to remove product 
router.delete('/products', async (req, res) => {
	var pCode = req.param('productCode')
	con.query("SET foreign_key_checks = 0; DELETE FROM products WHERE productCode = ?;  SET foreign_key_checks = 1;", pCode,function (err, result, fields) {
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


