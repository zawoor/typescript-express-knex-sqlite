import { v4 as uuidv4 } from 'uuid';
import Message from '../interfaces/message.interface';
import Knex from '../knex';

class MessagesService {

    /**
     * Return All Messages 
     *
     */
    public async getAll(): Promise<any> {
        const messages = await Knex('messages').select('*');
        return messages;
    }

    /**
     * Add message to database
     *
     * @param {any} body {title:string, body:string, author:string}.
     */
    public async addMessage(body: any, ip: string | string[]): Promise<any> {
        const id = uuidv4();

        let message: Message = {
            id: id,
            date: new Date().toISOString().split('T')[0],
            title: body.title,
            body: body.body,
            author: body.author,
            ip: JSON.stringify(ip)
        }

        const result = await Knex('messages').insert(message);
        return id;
    }

    /**
     * Add message to database
     *
     * Used in tests
     * 
     * @param {string} id id of message to retrive.
     */
    public async getMessage(id: any): Promise<any> {
        const messages = await Knex('messages').first('*').where({ id: id });
        if (typeof messages != 'undefined') {
            return messages;
        } else {
            return false;
        }
    }

    /**
     * Delete message
     * 
     * Used in tests
     *
     * @param {any} id Id of message to remove.
     */
    public async deleteMessage(id: any): Promise<any> {
        const result = await Knex('messages').where({ id: id }).del();
        return result;
    }
}

export default MessagesService;