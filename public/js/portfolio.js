// Functions 
let BTC = 0.00;
const tableFill = (currencies) => {
  currencies.forEach((currency) => {
    if (currency.short === 'BTC') BTC = currency.price;
    $('#table-holdings > tbody').append(`
    <tr currency-id="${currency.short}">
        <td>${currency.short}</td>
        <td>${currency.long}</td>
        <td>$ ${currency.price.toLocaleString()}</td>
        <td style="color: ${(currency.perc >= 0) ? 'green' : 'red'};">${currency.perc.toLocaleString()} %</td>
        <td>$ 0.00</td>
        <td>0.00000000</td>
        <td>0.00000000</td>
        <td><button class="add ${currency.short}">+</button><button class="remove ${currency.short}">-</button></td>
    </tr>
    `);
    $(`.add.${currency.short}`).click(() => {
      const amount = parseFloat(prompt(`How much ${currency.long} would you like to add? (BTC)`, '0.00000000'));
      if (!amount) return;
      socket.emit('receive: updateBalance', {
        symbol: currency.short,
        amount,
      });
    });
    $(`.remove.${currency.short}`).click(() => {
      const amount = 0 - parseFloat(prompt(`How much ${currency.long} would you like to remove? (BTC)`, '0.00000000'));
      if (!amount) return;
      socket.emit('receive: updateBalance', {
        symbol: currency.short,
        amount,
      });
    });
  });
  addBalances(balances);
};

const filter = (query) => {
  $('#table-holdings > tbody > tr').each((index, row) => {
    if (
      $(row).children('td').eq(1).html() // searches currency name regardless of capitalisation from query
        .toLowerCase()
        .includes(query)
      || $(row).children('td').eq(0).html() // repeats above but for currency symbol
        .toLowerCase()
        .includes(query)) {
      $(row).show();
    } else $(row).hide();
  });
  $('.table-wrapper').scrollTop(0); // resets user scrollbar to improve user experience
};

const addBalances = (balances) => {
  let total = 0;
  Object.keys(balances).forEach((currency) => {
    const price = parseFloat($(`#table-holdings > tbody > tr[currency-id='${currency}'`).children('td').eq(2).html()
      .replace(',', '')
      .split(' ')[1]);
    total += price * balances[currency];
    console.log(price, currency, balances[currency]);
    $(`#table-holdings > tbody > tr[currency-id='${currency}'`).children('td').eq(4).html(`$ ${(balances[currency] * price).toFixed(2)}`);
    $(`#table-holdings > tbody > tr[currency-id='${currency}'`).children('td').eq(5).html(((balances[currency] * price) / BTC).toFixed(8));
    $(`#table-holdings > tbody > tr[currency-id='${currency}'`).children('td').eq(6).html(balances[currency].toFixed(8));
    $('#total-holdings').html(`$ ${total.toLocaleString()} | ₿ ${(total / BTC).toFixed(8)}`);
  });
};

// JQuery

$(document).ready(() => {
  $('#no-holdings').prop('checked', false);
  $('#no-holdings').change(() => {
    if (!$('#no-holdings').prop('checked')) {
      $('#table-holdings > tbody > tr').each((index, row) => {
        $(row).show();
      });
      return;
    }
    $('#table-holdings > tbody > tr').each((index, row) => {
      if (parseFloat($(row).children('td').eq(5).html()) <= 0) {
        $(row).hide();
      }
    });
  });
  $('#searchHoldings').on('input', () => {
    query = $('#searchHoldings').val().toLowerCase();
    filter(query);
  });
});

// Socket

const socket = io();

socket.on('send: currencyInfo', (currencies) => {
  socket.off('send: currencyInfo');
  console.log(currencies);
  tableFill(currencies);
});

let balances = {};
socket.on('send: balances', (data) => {
  if (!data) return;
  const { err, message } = data;
  balances = data.balances;
  if (err) return;
  addBalances(balances);
});