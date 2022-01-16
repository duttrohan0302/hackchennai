module.exports = {
    mongoURI: process.env.MONGO_URI,
    frontendURL: process.env.NODE_ENV==="development" ? "http://localhost:3000" : "https://ngo-districtdata.herokuapp.com", // Enter production url when in production,
    secretOrKey: process.env.SECRETORKEY
}

// mongoURI: "mongodb+srv://<username>:<password>@cluster0-yz7ot.mongodb.net/hackchennai?retryWrites=true&w=majority",
