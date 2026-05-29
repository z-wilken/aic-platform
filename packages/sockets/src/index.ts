import { AIC_EVENTS } from '@aic/events';

export const AIC_SOCKET_CHANNELS = {
    ADMIN: "channel:admin",
    CLIENT: (orgId: string) => `channel:client:${orgId}`
};

export interface SocketMessage {
    event: AIC_EVENTS;
    payload: any;
}
