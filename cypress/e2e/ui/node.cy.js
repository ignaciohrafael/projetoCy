describe('Testes do cypress.config.js', () => {
    
    it('conta o total de arquivos da pasta API', () => {

        cy.task('lerPasta', 'cypress/e2e/api')
            .then(totalArquivos => {
                expect(totalArquivos).to.eq(2)

            })        
    })

    it.only('valida a conexao com o mongo', () => {
        cy.task('conectarMongo')
    })
})