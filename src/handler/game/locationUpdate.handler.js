import { getGameSession } from '../../sessions/game.session.js';
import User from '../../classes/models/user.class.js';
import { addUser } from '../../sessions/user.session.js';
import Game from '../../classes/models/game.class.js';

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;
    const gameSession = getGameSession();

    if (!gameSession) {
      console.error('Game session not found');
    }

    const user = gameSession.getUser(userId);
    if (!user) {
      console.error('User not found');
    }

    user.updatePosition(x, y);

    socket.write('');
  } catch (e) {
    console.error(e);
  }
};

export default locationUpdateHandler;
