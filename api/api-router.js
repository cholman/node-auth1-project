const router = require('express').Router();
const bcrypt = require('bcryptjs');


const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const restricted = require('../auth/restricted-middleware.js');

router.use('/auth', authRouter);
router.use('/users', restricted, usersRouter);

router.get('/hash', (req, res) => {
  //read auth header
   const authentication = req.headers.authentication; //how to read the header?

   //hash the value from that header
   const hash = bcrypt.hashSync(authentication, 16);  //how to use bcryptjs to hash the authentication value?
   //bcrypt.compareSync(authentication, hash);
   
  //$2a$13$a306q4Zz/1YK.L1OGAKX7.leBmIhLV.Gwq7css51GHaFo3LfqdvEu
  //$2a$13$UVk5Kkp95BXilPPKo7FXPunMFrUaBkRwrZRzYk27LyBbwDtrdWpj.
  //$2a$16$e2nMvY0KbVo3Qzf3fRPRdeq5NjEjTM1WA13/JFoAOwanEVEtCEuRO

  res.json({ originalValue: authentication, hashedValue: hash })
})

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

module.exports = router;
