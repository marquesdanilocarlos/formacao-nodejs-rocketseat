export default class MealsController {
  async index() {
    return { message: 'Listagem de refeições' };
  }

  async create() {
    return { message: 'Criação de refeição' };
  }

  async show() {
    return { message: 'Detalhes da refeição' };
  }

  async update() {
    return { message: 'Atualização de refeição' };
  }

  async delete() {
    return { message: 'Deletar refeição' };
  }
}
