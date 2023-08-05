console.log("FOR DEMO PURPOSES ONLY");
const card = 123456789;
console.log("Credit Card: ", card);

const privateKey = 33333333;
console.log("Private Key: ", privateKey);

const encryptedCard = card ^ privateKey;
console.log("Encryption: ", encryptedCard);

const decryption = privateKey ^ encryptedCard;
console.log("Decryption: ", decryption);

console.log("==============================");


const targetButtonId = "PayNowWithTokenization"; // Replace with the ID of your specific button
const targetButton = document.getElementById(targetButtonId);

if (targetButton) {
	targetButton.addEventListener("click", () => {
		console.log("Pay Button clicked!");
		fetch("http://localhost:8080/generateTransactionId/", {
			method: "GET",
			mode: "cors",
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(
					"Sending Private Key to Synchrony Server from User"
				);
				return fetch("http://localhost:8080/processPaymentUser/", {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						transactionId: data.transactionId,
						privateKey: 3333344,
					}),
				});
			})
			.then((response) => response.json())
			.then((data) => {
				console.log("Sending Encrypted Card to Vendor");
				data.tokenizedCard = encryptedCard;
				// Create a custom event with the data
				const customEvent = new CustomEvent("extensionData", {
					detail: {
						usersPaymentStatus: data.paymentStatus,
						transactionId: data.transactionId,
						tokenizedCard: data.tokenizedCard,
					},
				});

				// Dispatch the custom event to the website
				window.dispatchEvent(customEvent);
			})
			.catch((error) => {
				console.log("ERROR", error);
			});
	});
}
