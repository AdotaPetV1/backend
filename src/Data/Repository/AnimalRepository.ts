
import express, { Router } from 'express';
const knex = require('../Data/Database/ConfigDataBase');
const router = express.Router();

module.exports = {

    //funçao Get
    async index(req, res) {
        const results = await knex.select('IdAnimal').from('Animal').then((results) => 
        res.json(results))
    },
    //funçao Post
    async create(req, res, next){
        //TryCatch para verificar se tudo o que o usuário inseriu esta de acordo com o que necessita na tabela
        
        try {
            const {Nome, Raca, Porte, Idade, Sexo, TipoAnimal, Limitacoes,
                Descricao, Castrado, VacinacaoEmDia} = req.body
         await knex('Animal').insert({
             Nome:'', 
             Raca:'',
             Porte:'',
             Idade:'',
             Sexo:'',
             TipoAnimal:'',
             Limitacoes:'',
             Descricao:'',
             Castrado:'',
             VacinacaoEmDia:'',    
         })  
        } catch (error) {
            next (error);
            }
            
        }
        
    }
