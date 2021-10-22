/**
 * RECEBER CODE(string)
 * RECUPERAR O ACCESS_TOKEN no gitHub
 * VERIFICAR se o usuário existe no banco de dados
 * ----- SE SIM O USUÁRIO EXISTIR = GERA UM TOKEN
 * ----- Se NÃO Existir = Cria no Banco de Dados e Gera um Token 
 * RETORNA  o token com as informações do usuário logado
 */

import axios from "axios"


class AutenticateUserService{

  async execute(code: String){
    
    const url = "https://github.com/login/oauth/access_token"

    const response = await axios.post(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json"
      }
    })

    return response.data
  }

}

export {AutenticateUserService}