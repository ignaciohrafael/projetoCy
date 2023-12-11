import { testeContratoPOSTPosts } from '../../fixtures/schema-POST-posts'
import { testeContratoGETPosts } from '../../fixtures/schema-GET-posts'
import 'cypress-v10-preserve-cookie'


describe('CRUD - Posts', () => {

    let postId = ''
    let mensagem = 'Este post foi feito pelo Cypress'

    const login = (email, password) => {
        cy.authent(email, password)
    } 
        
    before(() => {
        
        login(Cypress.env('email'), Cypress.env('password'))

    })
    
    beforeEach(() => {

        cy.preserveCookieOnce('jwt')

    })
  

    after(() => {

        cy.clearCookie('jwt').should('be.null') 

    })

    it('cria um post', () => {

        cy.request({
            method: 'POST',
            url: '/api/posts',
            body:{
                text: mensagem
            }
        }).then(({ status, body }) => {
            expect(status).to.equal(201)
            expect(body.text).to.eq(mensagem)
            postId = body._id
            
            cy.testeContrato(testeContratoPOSTPosts, body)
        })
    })

    it('lê o post', () => {
        cy.request({
            method: 'GET',
            url: `/api/posts/${postId}`
        }).then(({ status, body }) => {
            expect(status).to.eq(200)
            expect(body.text).to.eq(mensagem)
            expect(body.likes).to.have.lengthOf(0)

            cy.testeContrato(testeContratoGETPosts, body)
        })
        
    })

    it('atualiza o post', () => {
        
        cy.request({
            method: 'PUT',
            url: `/api/posts/like/${postId}`
        }).then(({ status }) => {
            expect(status).to.equal(200)

            cy.request({
                method: 'GET',
                url: `/api/posts/${postId}`
            }).then(({ body }) => {
                expect(body.likes).to.have.lengthOf(1)
            })
        })
    })
    it('deleta o post', () => {
        
        cy.request({
            method: 'DELETE',
            url: `/api/posts/${postId}`
        }).then(({ status, body }) => {
            expect(status).to.eq(200)
            expect(body.msg).to.eq('Post removido')

            cy.request({
                method: 'GET',
                url: `/api/posts/${postId}`,
                failOnStatusCode: false
            }).then(({ status }) => {
                expect(status).to.eq(404)
            })
        })
    })
})