const request = require('request');

module.exports = {
  reqCrypto: (method) => {
    return new Promise((res, rej) => {
      request(`https://coincap.io/${method}`, (err, resp, body) => {
        if (err) rej(err);
        else {
          try { res(JSON.parse(body)); } catch (err2) {
            rej(err2);
          }
        }
      });
    });
  },
};
