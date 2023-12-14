describe('alertas', () => {
    
    it('valida o alerta de credencial inválida', { tags: ['@alerta', '@smoke']}, () => {
        
        cy.clock()

        cy.visit('http://localhost:3000/login')

        // preenche o campo email
        cy.getElement('login-email')
            .type('rafael@rafael.com')

        // preenche o campo senha    
        cy.getElement('login-password')
            .type('123456')

        // clica no botao submit
        cy.getElement('login-submit')
            .click()

        // valida o alerta de credencial inválida
        cy.getElement('alert')
            .should('have.text', 'Credenciais inválidas')

        cy.tick(10000)

        // valida se o alerta desapareceu
        cy.getElement('alert')
            .should('not.exist')

    
    })
})