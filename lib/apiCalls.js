const request = require('request');
const utils = require('./utils');

const biggestChange = (events) => {
  utils.reqCrypto('front').then((currencies) => {
    events.emit('currency-info', currencies); // emits the currency information back to the node process
    setTimeout(() => {
      biggestChange(events);
    }, 1000 * 15);
  }).catch((error) => {
    console.log(error);
    setTimeout(() => {
      biggestChange(events);
    }, 1000 * 15);
  });
};

const coinHistory = (short, time = '365days') => {

};

module.exports.biggestChange = biggestChange;
