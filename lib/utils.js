const request = require('request');

module.exports = {
  reqCrypto: (method) => new Promise((res) => {
    request(`https://coincap.io/${method}`, (err, resp, body) => {
      if (err) {
        console.log(err);
        return res({});
      }
      try {
        return res(JSON.parse(body));
      } catch (err2) {
        console.log(err2);
        return res({});
      }
    });
  }),
};
