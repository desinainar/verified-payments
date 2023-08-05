const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 8080; // Change this to the desired port number

// Middleware for parsing JSON data from request body
app.use(cors());
app.use(bodyParser.json());

let transactions = {};

const getTransactionStatus = (transactionId) => {
	if (!transactions[transactionId]) {
		return "failed";
	}
	if (
		transactions[transactionId].privateKey === "" ||
		transactions[transactionId].tokenizedCard === ""
	) {
		return "pending";
	} else {
		const decryptedCard =
			transactions[transactionId].privateKey ^
			transactions[transactionId].tokenizedCard;
		console.log("Decrypted Card: ", decryptedCard);
		if (decryptedCard === 123456789) {
			delete transactions[transactionId];
			return "verified";
		} else {
			console.log(transactions[transactionId]);
			delete transactions[transactionId];
			return "failed";
		}
	}
};

app.get("/generateTransactionId", (req, res) => {
	const transactionId = uuidv4();
	transactions[transactionId] = { privateKey: "", tokenizedCard: "" };
	console.log(`Generated transaction ID ${transactionId}`);
	res.send({ transactionId });
});

app.post("/processPaymentUser", (req, res) => {
	const transactionId = req.body.transactionId;
	console.log(`Processing payment for transaction ID ${transactionId}`);

	if (!transactions[transactionId]) {
		res.status(401);
		res.send({
			paymentStatus: "failed",
			transactionId,
			message: `${paymentStatus} processed payment for transaction ID ${transactionId}`,
		});
	} else {
		transactions[transactionId].privateKey = req.body.privateKey;
		const paymentStatus = getTransactionStatus(transactionId);

		if (paymentStatus === "verified") {
			res.status(200);
		} else if (paymentStatus === "failed") {
			res.status(401);
		} else {
			res.status(201);
		}

		res.send({
			paymentStatus,
			transactionId,
			message: `${paymentStatus} processed payment for transaction ID ${transactionId}`,
		});
	}
});

app.post("/processPaymentVendor", (req, res) => {
	const transactionId = req.body.transactionId;
	console.log(`Processing payment for transaction ID ${transactionId}`);

	if (!transactions[transactionId]) {
		res.status(401);
		res.send({
			paymentStatus: "failed",
			transactionId,
			message: `failed processed payment for transaction ID ${transactionId}`,
		});
	} else {
		transactions[transactionId].tokenizedCard = req.body.tokenizedCard;
		const paymentStatus = getTransactionStatus(transactionId);

		if (paymentStatus === "verified") {
			res.status(200);
		} else if (paymentStatus === "failed") {
			res.status(401);
		} else {
			res.status(201);
		}

		res.send({
			paymentStatus,
			transactionId,
			message: `${paymentStatus} processed payment for transaction ID ${transactionId}`,
		});
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
