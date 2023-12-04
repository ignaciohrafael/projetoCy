import Ajv from 'ajv'

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

Cypress.Commands.add('testeContrato', () => {

    // função de mostra os erros
    const getSchemaError = (ajvErros) => {
        return cy.wrap(
            `Campo: ${ajvErros[0]['instancePath']} é inválido. Erro: ${ajvErros[0]['message']}`
        )
    }
})