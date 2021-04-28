export type Response = {
    token: string
    user: {
        USU_ST_LOGIN: string
        USU_IN_CODIGO: string
        ORG_IN_CODIGO: string
    }
}

export function SignIn(usuarioLogin: Response): Promise<Response> {
    return new Promise(resolve => {
        resolve({
            token: `${usuarioLogin.token}`,
            user: {
                USU_ST_LOGIN: `${usuarioLogin.user.USU_ST_LOGIN}`,
                USU_IN_CODIGO: `${usuarioLogin.user.USU_IN_CODIGO}`,
                ORG_IN_CODIGO: `${usuarioLogin.user.ORG_IN_CODIGO}`
            }
        })
    })
}