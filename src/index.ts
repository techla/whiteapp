import express from 'express';
import { Status, StatusOpen, ResponseEnded } from 'hyper-ts';
import { Middleware, status, ichain, send, closeHeaders } from 'hyper-ts/lib/Middleware';
import { toRequestHandler } from 'hyper-ts/lib/express';
import { pipe } from 'fp-ts/function';
import { IO } from 'fp-ts/IO';

const port = process.env.PORT || '3000';

const hello: Middleware<StatusOpen, ResponseEnded, never, void> = pipe(
  status(Status.OK),
  ichain(() => closeHeaders()),
  ichain(() => send('Hello hyper-ts on express!')),
);

const server: IO<void> = () =>
  express()
    .get('/', toRequestHandler(hello))
    .listen(port, () => console.log('Express listening on port 3000. Use: GET /'));

server();
