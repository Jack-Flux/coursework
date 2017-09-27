const request = require('request');

const biggestChange = (events) => {
  request('https://coincap.io/front', (err, resp, body) => {
    if (err) console.log(err);
    let currencies;
    try {
      currencies = JSON.parse(body);
      events.emit('currency-info', currencies); // emits the currency information back to the node process
      setTimeout(() => {
        biggestChange(events);
      }, 1000 * 15); // 15 second timeout between api calls
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        biggestChange(events);
      }, 1000 * 15); // 15 second timeout between api calls
    }
  });
};

const coinHistory = (short, time = '365days') => {
  request('https://coincap.io/front', (err, resp, body) => {
    if (err) console.log(err);

  });
};

module.exports.biggestChange = biggestChange;
