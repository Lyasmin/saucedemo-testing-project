describe('FR-01 – User Authentication | Protected Routes', () => {
    it('[TC-AUTH-012] Validate protected routes without login', () =>{
        cy.visit('/inventory.html', { failOnStatusCode: false })
        cy.url().should('not.include', '/inventory.html')
        cy.get('.inventory_list').should('not.exist')
    })
})