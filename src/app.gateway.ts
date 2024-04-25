import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {TestService} from "./test/test.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private counter = 0

    private logger: Logger = new Logger('AppGateway');
    @SubscribeMessage('msgToServer')
    async handleMessage(client: Socket, payload: string) {
        this.counter++;
        this.server.emit('msgToClient', this.counter);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    async handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        this.server.emit('msgToClient', await this.counter);
    }
}