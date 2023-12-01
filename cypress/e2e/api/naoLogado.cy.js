describe('API - Profile', () => {

    context('todos os perfis', () => {

        it('valida a API de perfis', () => {
            cy.log('Test de texto')
            cy.request({
                method: 'GET',
                url: '/api/profile'
            }).then(({ status, duration, body, headers }) => {
                expect(status).to.equal(200)
                expect(duration).to.be.lessThan(10000)
                expect(body[0].status).to.eq('Especialista em QA')
                expect(body[0].user.name).to.equal('Rafael tester')
                expect(body[0].skills).to.have.lengthOf(1)
                expect(body[0].date).to.not.be.null
                expect(headers['x-powered-by']).to.equal('Express')
            })
        })
    })


    context('perfil específico', () => {

        it('seleciona um usuário inválido', () => {
            cy.request({
                method:'GET',
                url: '/api/profile/user/1', 
                failOnStatusCode: false
            }).then(({ status, body }) => {
                expect(status).to.eq(404)
                expect(body.errors[0].msg).to.equal('Perfil não encontrado')
            })               
           
        })      
    

        it('valida um usuário válido', () => {
            let usuarioId = '6568878301177b51e83b7ef2'

            cy.request({
                method: 'GET',
                url: `/api/profile/user/${usuarioId}`
            }).then(({ status, body }) => {
                expect(status).to.eq(200)
            })
        })

        it.only('valida um usuário buscando na base', () => {

            cy.request({
                method: 'GET',
                url: '/api/profile'
            }).then(({ body }) => {
                                
                cy.request({
                    method: 'GET',
                    url: `/api/profile/user/${body[1].user._id}`
                }).then(({ status, body }) => {
                    expect(status).to.eq(200)
                    expect(body.status).to.eq('Gerente de Testes')
                })

            })
            
        })
        
    })
     
})