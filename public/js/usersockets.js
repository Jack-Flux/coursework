const socket = io();

let storedCurrencies = [];
socket.on('send: currencyInfo', (currencies) => {
  console.log('Currency info received');
  if (storedCurrencies.length === 0) tableFill(currencies);
  else if(currencies !== storedCurrencies){ // impliment a bettter loss/gain showing system
    console.log('Updating markets');
    currencies.forEach((currency) => {
      const row = $(`#table-currencies > tbody > tr[currency-id="${currency.short}"]`);
      let temp = {
        price: parseFloat($(row).children('td').eq(3).html()
          .replace('$ ', '')),
        mktcap: parseFloat($(row).children('td').eq(0).html()
          .replace('$ ', '')),
        perc: $(row).children('td').eq(4).html().replace(' %', ''),
      }

      if (currency.price !== temp.price){
        console.log(currency.short);
        $(row).children('td').eq(3).html(`$ ${currency.price}`);
        $(row).children('td').eq(3).css('color', `${currency.price > temp.price ? 'green' : 'red'}`);

      }
      if (currency.mktcap !== temp.mktcap){
        $(row).children('td').eq(0).html(`$ ${currency.mktcap}`);
        $(row).children('td').eq(0).css('color', `${currency.mktcap > temp.mktcap ? 'green' : 'red'}`);
      }
      if (currency.perc !== temp.perc){
        $(row).children('td').eq(4).html(`${currency.perc}%`);
        $(row).children('td').eq(4).css('color', `${currency.perc >= 0 ? 'green': 'red'}`);
      }
      /*

      $(row).children('td').eq(0).html(`$ ${currency.mktcap}`);
      $(row).children('td').eq(0).css('color', `${currency.mktcap > parseFloat($(row).children('td').eq(0).html()
        .replace('$ ', '')) ? 'green' : 'red'}`);
      $(row).children('td').eq(4).html(`${currency.perc} %`);
    });
    storedCurrencies = currencies;*/
    });
  }
  storedCurrencies = currencies;
});
