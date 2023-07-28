// Routers for User
const user = require('../controllers/user.js');
const middleware = require("../middleware/auth.js")
const router = require("express").Router();

router.post('/login', user.login);
router.post('/streak/update', middleware.isLoggedIn, user.UpdateStreak);
router.post('/word/add', middleware.isLoggedIn, user.AddWord);
router.get('/details', middleware.isLoggedIn, user.GetUserDetails)
router.get('/word/search', middleware.isLoggedIn, user.WordSearch)

module.exports = router;