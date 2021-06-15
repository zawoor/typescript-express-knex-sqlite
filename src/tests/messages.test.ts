import request from 'supertest';
import App from '../app';
import IndexRoute from '../routes/index.route';
import MessageService from '../services/messages.service';
import iconv from 'iconv-lite';
iconv.encodingExists('foo');

describe('Testing Messages', () => {

    describe('[GET] /', () => {
        it('response statusCode 200', () => {
            const ordersRoute = new IndexRoute();
            const app = new App([ordersRoute]);
            return request(app.getServer()).get(`${ordersRoute.path}`).expect(200);
        });
    });

    describe('[PUT] /', () => {
        it('response statusCode 200', async () => {
            const ordersRoute = new IndexRoute();
            const app = new App([ordersRoute]);

            const data = {
                title: '1',
                body: '2',
                author: '3',
            }

            request(app.getServer()).put(`${ordersRoute.path}`).send(data).expect(200).then(async (response) => {

                const messagesService = new MessageService();
                const message = await messagesService.getMessage(response.body.data);
                await messagesService.deleteMessage(response.body.data);

                expect(response.body.data).toBe(message.id);
                expect(data.title).toBe(message.title);
                expect(data.body).toBe(message.body);
                expect(data.author).toBe(message.author);

            })
        });
    });

});
