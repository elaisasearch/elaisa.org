describe('Search for documents', function () {
    it('Visits the page and searches for summer in english and level C2', function () {

        // type in a search value only
        cy.visit('http://elaisa.org')
        cy.focused().type('summer').type('{enter}')
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please define your level and a language')
        })

        // choose a language
        cy.get('form').first().click()
        cy.contains('English').click()

        // test if alert appears
        cy.get('[aria-label="toggle search"]').click()

        // choose a level
        cy.get('form').eq(1).click()
        cy.contains('C2').click()

        // search
        cy.get('[aria-label="toggle search"]').click()
        cy.request('GET','http://api.elaisa.org/find?query=summer&level=C2&language=en&email=frodo.beutlin@hobbits.com&loggedin=false')
        cy.url().should('equal', 'http://elaisa.org/results?query=summer&level=C2&language=en')
    
        // check the results page
        cy.contains('5 results for "summer"')
        cy.get('tbody').get('li').should('have.length', 5)
        cy.get('li').first().get('#levelDiv').contains('C2')
        
    })
})