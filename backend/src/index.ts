import Server from './server';
import { setup } from './di-config';
import { Logger } from './utils';

setup();
(new Server()).start().catch(err => Logger.error(err.message));
