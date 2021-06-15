import { NextFunction, Request, Response } from 'express';
import MessagesService from '../services/messages.service';

class OrdersController {
    public messagesService = new MessagesService();

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orders = await this.messagesService.getAll();
            res.status(200).json({ message: 'getAllMessages', data: orders });
        } catch (error) {
            next(error);
        }
    };

    public addMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
            const result = await this.messagesService.addMessage(req.body, ip);
            res.status(200).json({ data: result, message: 'addMessage' });
        } catch (error) {
            next(error);
        }
    };
}

export default OrdersController;
