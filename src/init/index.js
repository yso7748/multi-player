import { addGameSession } from '../sessions/game.session.js';
import { testConnection } from '../utils/db/testConnection.js';
import { loadProtos } from './loadProto.js';
import { v4 as uudiv4 } from 'uuid';

const initServer = async () => {
  try {
    await loadProtos();
    const gameId = uudiv4();
    const gameSession = addGameSession(gameId);
    await testConnection();
  } catch (e) {
    console.error(e);
    Process.exit(1);
  }
};

export default initServer;
