module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', {

    });
  });
  app.get('/*', (req, res) => {
    res.redirect('/'); // Redirects if incorrect URL
  });
};
