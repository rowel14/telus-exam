/// <reference types="cypress" />

describe('API testing answers', () => {

    let createUserRequest;

    beforeEach(() => {
        cy.fixture('user').then(user => {
            createUserRequest = user;
        });
    })

    it('Verify create user endpoint', () => {

        cy.request({
            method: 'POST',
            url: '/user',
            form: false,
            body: createUserRequest
        }).then(res =>{
            expect(res.body.code).equal(200)
        })

        cy.request({
            method: 'GET',
            url: `/user/${createUserRequest.username}`,
        }).then(res =>{
            expect(res.body.username).equal(createUserRequest.username)
        })
    })

    it('Verify sold pets are returned by GET pet by status endpoint', () => {

        const petStatus = 'sold'

        cy.request({
            method: 'GET',
            url: `/pet/findByStatus?status=${petStatus}`,
        }).then(res =>{

            for (let i = 0; i < res.body.length; i++) {
                
                expect(res.body[i].status).equal(petStatus)
            }
        })
    })
})