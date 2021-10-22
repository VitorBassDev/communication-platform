/**
 * RECEBER CODE(string)
 * RECUPERAR O ACCESS_TOKEN no gitHub
 * RECUPERAR AS INFORMAÇÕES DO USUÁRIO DO GITHUB
 * VERIFICAR se o usuário existe no banco de dados
 * ----- SE SIM O USUÁRIO EXISTIR = GERA UM TOKEN
 * ----- Se NÃO Existir = Cria no Banco de Dados e Gera um Token 
 * RETORNA  o token com as informações do usuário logado
 */

import axios from "axios"
import { response } from "express"

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string
}

class AutenticateUserService{

  async execute(code: String){
    
    const url = "https://github.com/login/oauth/access_token"

    const {data: accessTokenResponse} = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json"
      }
    })

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}` 
      }
    })

    return response.data
  }
}

export {AutenticateUserService}