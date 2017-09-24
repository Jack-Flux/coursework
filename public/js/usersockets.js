const socket = io();

let storedCurrencies = [];
socket.on('send: currencyInfo', (currencies) => {
  if (storedCurrencies.length === 0) tableFill(currencies);
  else { // impliment a bettter loss/gain showing system
    currencies.forEach((currency) => {
      const row = $(`#table-currencies > tbody > tr[currency-id="${currency.short}"]`);
      $(row).children('td').eq(3).html(`$ ${currency.price}`);
      $(row).children('td').eq(3).css('color', `${currency.price > parseFloat($(row).children('td').eq(3).html()
        .replace('$ ', '')) ? 'green' : 'red'}`);
      $(row).children('td').eq(0).html(`$ ${currency.mktcap}`);
      $(row).children('td').eq(0).css('color', `${currency.mktcap > parseFloat($(row).children('td').eq(0).html()
        .replace('$ ', '')) ? 'green' : 'red'}`);
      $(row).children('td').eq(4).html(`${currency.perc} %`);
    });
  }
  storedCurrencies = currencies;
});
