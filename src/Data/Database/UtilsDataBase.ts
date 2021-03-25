import { knex } from './ConfigDataBase';

export function OpenConnection(){
    return knex.initialize();
}

export function CloseConnection(){
    return knex.destroy();
}