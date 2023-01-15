const express = require('express');
const router = express.Router();
const { createTag, allTags, specTag, delTag, allSpecTags } = require('../controllers/tagController');


router.post('/createTag', createTag);
router.get('/allTags', allTags);
router.get('/allSpecTags/:id', allSpecTags);
router.get('/specTag/:id', specTag);
router.delete('/deleteTag/:id', delTag);


module.exports = router;