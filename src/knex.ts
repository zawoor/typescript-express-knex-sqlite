import Knex from 'knex';

export default Knex({
    client: 'sqlite3',
    connection: {
        filename: "./messages.db"  
    },
    useNullAsDefault: true
});