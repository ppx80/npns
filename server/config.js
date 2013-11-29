//Configs
module.exports = {
  sqlite: {
    dbUrl: 'https://api.mongolab.com/api/1',            // The base url of the MongoLab DB server
    apiKey: '9WyvNK-XZsb5dovmAHoX_5R-4lTtWbjK',         // Our MongoLab API key
    dbName: 'fmdb'                                      // Database name
  },
  server: {
    listenPort: 3000,   // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
    securePort: 8433    // The HTTPS port on which the server is to listen (means that the app is at https://localhost:8433 for instance)
  }
};