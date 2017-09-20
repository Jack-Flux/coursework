const request = require('request');

const biggestChange = (events) => {
  setTimeout(() => {
    request('https://api.coinmarketcap.com/v1/ticker/', (err, resp, body) => {
      let currencies;
      try {
        currencies = JSON.parse(body);
        events.emit('biggestChange', currencies);
        biggestChange(events);
      } catch (error) {
        console.log(error);
      }
    });
  }, 10000); // 10 seconds
};

module.exports = (events) => {
  biggestChange(events);
};
