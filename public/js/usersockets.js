const socket = io();

let storedCurrencies = [];
socket.on('send: currencyInfo', (currencies) => {
  console.log('Currency info received');
  if (storedCurrencies.length === 0) tableFill(currencies);
  else if (currencies !== storedCurrencies) { // impliment a bettter loss/gain showing system
    console.log('Updating markets');
    currencies.forEach((currency) => {
      const row = $(`#table-currencies > tbody > tr[currency-id="${currency.short}"]`);
      const temp = {
        price: parseFloat($(row).children('td').eq(3).html()
          .replace('$ ', '')),
        mktcap: parseFloat($(row).children('td').eq(0).html()
          .replace('$ ', '')),
        perc: $(row).children('td').eq(4).html()
          .replace(' %', ''),
      };

      if (currency.price !== temp.price) {
        console.log(currency.short);
        $(row).children('td').eq(3).html(`$ ${currency.price}`);
        let arrow = $(currency.price > temp.price ? '<i class="material-icons" style="color: green;">arrow_upward</i>' : '<i class="material-icons" style="color: red">arrow_downward</i>');
        $(row).children('td').eq(3).append(arrow.fadeOut(6000));
      }
      if (currency.mktcap !== temp.mktcap) {
        $(row).children('td').eq(0).html(`$ ${currency.mktcap}`);
        let arrow = $(currency.mktcap > temp.mktcap ? '<i class="material-icons" style="color: green;">arrow_upward</i>' : '<i class="material-icons" style="color: red">arrow_downward</i>');
        $(row).children('td').eq(0).append(arrow.fadeOut(6000));
      }
      if (currency.perc !== temp.perc) {
        $(row).children('td').eq(4).html(`${currency.perc}%`);
        $(row).children('td').eq(4).css('color', `${currency.perc >= 0 ? 'green' : 'red'}`);
      }
    });
  }
  storedCurrencies = currencies;
});
