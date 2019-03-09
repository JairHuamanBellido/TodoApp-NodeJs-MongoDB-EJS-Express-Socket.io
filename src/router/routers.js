const express =  require('express');
const router = express.Router();

// ROUTES
router.get('/', async(req,res)=>{
    res.send('To do page')
})

module.exports = router;