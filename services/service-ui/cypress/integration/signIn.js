describe('Login to Elaisa', function () {
    it('Visits the sign in page', function () {

        // route to sign in page
        cy.visit('http://elaisa.org')
        cy.get('.avatarButton').click()
        cy.contains('Sign In').click()
        cy.url().should('include', '/signin')

        // fill in the login form
        cy.contains('Sign In').should('be.disabled')
        cy.get('#email')
            .type('teusz.alexander@gmail.com')
            .should('have.value', 'teusz.alexander@gmail.com')
        cy.contains('Sign In').should('be.disabled')
        cy.get('#password')
            .type('alex')
            .should('have.value', 'alex')
        cy.contains('Sign In').should('not.be.disabled')

        // press the sign in button
        cy.contains('Sign In').click()
        cy.request('POST','http://api.elaisa.org/signin?email=teusz.alexander@gmail.com&password=alex')
        cy.url().should('equal', 'http://elaisa.org/')
    })
})
