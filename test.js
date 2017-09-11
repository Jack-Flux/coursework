require('./lib/config/db').addUser('jack', 'flux').then((res) => {
  console.log(res);
}).catch((rej) => {
  console.log(rej);
});
