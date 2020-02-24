import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    // o super se referencia À class pai, logo se referencia a Model
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
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
