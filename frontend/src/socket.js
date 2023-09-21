import { io } from 'socket.io-client';

const URL ='http://web-01.olagoldhackxx.tech/socket';

export const socket = io(URL);