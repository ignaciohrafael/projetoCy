import Ajv from 'ajv'
import { definitionHelper } from '../utils/schemaDefinitions'

Cypress.Commands.add('authent', (email, password) => {

    cy.session([email, password], () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                email,
                password
            }
        }).then(({ body }) => {

            // window.localStorage.setItem('jwt', body.jwt)

            cy.setCookie('jwt', body.jwt)
            
        })
    })    


})

Cypress.Commands.add('testeContrato', (schema, resposta) => {


    // função de mostra os erros
    const getSchemaError = ajvErros => {
        return cy.wrap(
            `Campo: ${ajvErros[0]['instancePath']} é inválido. Erro: ${ajvErros[0]['message']}`
        )
    }

    // iniciar o AJV
    const ajv = new Ajv()
    const validacao = ajv.addSchema(definitionHelper).compile()
    const valido = validacao(resposta)

    // verificar se o schema passou ou falhou 
    if (!valido) {
        getSchemaError(validacao.errors).then(schemaError => {
            throw new Error(schemaError)
        })
    } else 
        expect(valido, 'Validação de contrato').to.be.true
    
})