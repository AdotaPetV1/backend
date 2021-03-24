import express, { Router } from 'express';
const knex = require('../Data/Database/ConfigDataBase');
const router = express.Router();
const AnimalRepository = require ('./Repository/AnimalRepository');

router.get('/Animal', AnimalRepository.index )
router.post('/Animal', AnimalRepository.create)


module.exports = router;





