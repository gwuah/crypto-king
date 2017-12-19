const request = require("request");
const EventEmmitter = require("events");

// API ENDPOINT
const BASE_URL = "https://api.coinmarketcap.com/v1/ticker/";

// create new instance of event-emmiter
const king = new EventEmmitter();

// listen to event and take action based on it
king.once("crypto-data", (data)=> {
	// we need only 10 crypto currencies
	const crypto_bags = data.slice(0, 10);
	// es6 my nigga!!
	for (const crypto_bag of crypto_bags) {
		console.log(`\n${crypto_bag.name} ::--> USD ${crypto_bag["price_usd"]}`)
	}
})

// make http request and emit response to listener
request(BASE_URL, { json: true }, (err, res, body) => {
	if (err) throw new Error(err) ;
	// { data: body, response: res }
	king.emit("crypto-data", body)
	// console.log(body)
})