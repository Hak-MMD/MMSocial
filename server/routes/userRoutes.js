const express = require('express');
const router = express.Router();
const { register, login, myAccount, whoAmI, deleteUser, followUser, unfollowUser, editUserPass, addDescription, addLocation, addUsername, addHobbies } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/addDescription', protect, addDescription);
router.post('/addLocation', protect, addLocation);
router.post('/addHobbies', protect, addHobbies);
router.post('/addUsername', protect, addUsername);
router.post('/login', login);
router.get('/myAccount/:id', protect, myAccount);
router.get('/whoAmI', protect, whoAmI);
router.delete('/delete-account/:id', deleteUser);
router.delete('/editUserPass', editUserPass);
// router.delete('/checkFollow/:id', protect, checkFollow);
router.put('/follow/:id', protect, followUser);
router.put('/unfollow/:id', protect, unfollowUser);

module.exports = router;