var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();

const createUserCntrl = require('../controlers/auth/createUser');
const authCntrl = require('../controlers/auth/auth');
const { json } = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/createUser', upload.none(), async (req, res) => {
  const {nameUser, passwordUser} = req.body;
  const doc = createUserCntrl(nameUser, passwordUser);
});

router.post('/loginUser', upload.none(), async (req, res) => {
  const { nameUser, passwordUser } = req.body;

  const rezalt = await authCntrl.login(nameUser, passwordUser);
  res.json({status: rezalt.status, accesstoken: rezalt.accesstoken, refreshToken: rezalt.refreshToken})
});

router.post('/chekToken', upload.none(), async(req, res) => {
  const {accesstoken, refreshToken} = req.body;
  const rezalt = await authCntrl.updateTokens(accesstoken, refreshToken);
  console.log(rezalt);

    if (rezalt.status !== 'ok'){
      res.json({status: rezalt.status})
      return;
    }
  const {payload} = rezalt;

  res.json({status: rezalt.status, login: payload.login, id: payload.id, accesstoken: rezalt.accesstoken, refreshToken: rezalt.refreshToken});
});


module.exports = router;
