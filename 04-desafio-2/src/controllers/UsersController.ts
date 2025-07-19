export default class UsersController {
  async index() {
    return { message: 'Listagem de usuários' };
  }

  async create() {
    return { message: 'Cadastro de usuários' };
  }

  async show() {
    return { message: 'Detalhes de usuário' };
  }

  async update() {
    return { message: 'Atualização de usuário' };
  }

  async delete() {
    return { message: 'Exclusão de usuário' };
  }
}
