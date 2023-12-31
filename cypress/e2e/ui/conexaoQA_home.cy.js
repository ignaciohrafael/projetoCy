describe('página inicial', () => {
    
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('valida o título da página inicial', () => {
        cy.contains('Conectando')
            .should('have.text', 'Conectando QAs ...')
            .and('have.class', 'x-large')
    })

    it('seleciona um elemento passando o seletor', () => {
        cy.contains('h1','QAs')
            .should('have.text', 'Conectando QAs ...')

    })

    it('seleciona um elemento com o filter', () => {
        
        // os seletores abaixo selecionam o botão cadastrar
        cy.get('a')
            .filter('.btn-primary')
            .should('have.text', 'Cadastrar')
            .click('left')

        // cy.get('a.btn-primary')

        // cy.contains('a', 'Cadastrar')

        cy.get('a')
            .eq(2)
            .should('have.text', 'Sobre')
            .click()
    })

    it.only('seleciona um elemento com o find', () => {
        cy.get('.landing-inner')
            .find('h1')

        // cy.get('.landing-inner h1')
    })
})