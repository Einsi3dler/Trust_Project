import { io } from 'socket.io-client';

const URL ='http://web-01.olagoldhackxx.tech';

export const socket = io(URL);