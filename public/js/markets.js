const tableFill = (currencies) => {
  $('#table-currencies > tbody').empty();
  currencies.forEach((currency) => {
    $('#table-currencies > tbody').append(`
    <tr currency-id="${currency.short}">
        <td>$ ${currency.mktcap.toLocaleString()}</td>
        <td>${currency.short}</td>
        <td>${currency.long}</td>
        <td>$ ${currency.price}</td>
        <td style="color: ${(currency.perc >= 0) ? 'green' : 'red'};">${currency.perc} %</td>
    </tr>
    `);
  });
  $('.table-wrapper').scrollTop(0); // resets user scrollbar to improve user experience
};

const bubbleSort = (key, operation) => {
  // storedCurrencies sourced from usersocket.js
  const tempCurrencies = storedCurrencies.slice(0);
  for (let i = 0; i < tempCurrencies.length; i += 1) {
    for (let j = 0; j < tempCurrencies.length; j += 1) {
      if (tempCurrencies[j][key] === 0) {
        tempCurrencies.splice(j, 1);
      } else if (tempCurrencies[j + 1] !== undefined && operation(tempCurrencies[j][key], tempCurrencies[j + 1][key])) {
        const temp = tempCurrencies[j];
        tempCurrencies[j] = tempCurrencies[j + 1];
        tempCurrencies[j + 1] = temp;
      }
    }
  }
  tableFill(tempCurrencies);
};

$(document).ready(() => {
  // search filter for markets
  $('#search').on('input', () => {
    const query = $('#search').val().toLowerCase();
    $('#table-currencies > tbody > tr').each((index, row) => {
      if (
        $(row).children('td').eq(2).html()
          .toLowerCase() // ensure users can search regardless of capitalisation
          .includes(query) // compares search query
        || $(row).children('td').eq(1).html() // repeats above but for currency symbol
          .toLowerCase()
          .includes(query)) {
        $(row).show();
      } else $(row).hide();
    });
  });
  $('#mktcap_desc').click(() => tableFill(storedCurrencies));
  $('#mktcap_asc').click(() => bubbleSort('mktcap', (a, b) => b < a));
  $('#big_gainers').click(() => bubbleSort('perc', (a, b) => b > a));
  $('#big_losers').click(() => bubbleSort('perc', (a, b) => b < a));
});
