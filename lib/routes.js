const loggedIn = (req, res, next) =>{
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index', {
      user: req.user,
    });
  });
  app.get('/login', (req, res) => {
    res.render('login', {
      user: req.user,
    });
  });
  app.get('/history', (req, res) => {
    res.render('history', {
      user: req.user,
    });
  });
  app.get('/portfolio', loggedIn, (req, res) => {
    res.render('portfolio', {
      user: req.user,
    });
  });
  app.get('/about', (req, res) => {
    res.render('about', {
      user: req.user,
    });
  });
  app.get('/logout', loggedIn, (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/login',
  }));
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));
};

const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) { return next(); }

  // if they aren't redirect them to the home page
  res.redirect('/');
};
