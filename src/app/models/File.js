import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    // o super se referencia À class pai, logo se referencia a Model
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        // objeto necessário após a declaração dos campos
        sequelize,
      }
    );

    return this;
  }
}

export default File;
