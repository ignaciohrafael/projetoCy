describe('página de login', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })

    it('faz o login válido', () => {

        cy.intercept('GET', '/api/profile/me')
            .as('apiLogin')
        
        // preenche o email
        cy.getElement('login-email')
            .type(Cypress.env('email'), { delay: 50 })

        // preenche a senha
        cy.getElement('login-password')
            .type(Cypress.env('password'))

        // clica no login
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.getElement('login-submit')
            .click()
            .wait('@apiLogin')
            
            /* .then(({ response }) => {
                expect(response.body.errors[0].msg).to.eq('Não há perfil para este usuário')
            }) */
            

        // valida se o usuário está logado
        cy.getElement('dashboard-welcome')
            .should('contain', 'Rafael tester')
    })
})