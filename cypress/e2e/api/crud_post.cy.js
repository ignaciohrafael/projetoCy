describe('CRUD - Posts', () => {
    
    before(() => {
        
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                email: 'rafaeltester@test.com',
                password: '123456'
            }
        })
    })

    it('teste', () => {
        cy.log('teste')
    })
})