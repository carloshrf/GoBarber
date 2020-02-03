import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    // como o valor de email tem o mesmo nome da variavel, dispensa adicionar email: email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // envia no payload da sessão a informação de id para futuras verificações
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn, // token expires in 7 days
      }),
      // este código em hex é um hash md5 gerado online a partir da string "gobarberrocketseatnode2"
    });
  }
}

export default new SessionController();
