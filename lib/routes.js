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
  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/login',
  }));
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login', // redirect back to the signup page if there is an error
  }));
};

const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) { return next(); }

  // if they aren't redirect them to the home page
  res.redirect('/');
};
