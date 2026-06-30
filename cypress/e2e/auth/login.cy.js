describe('FR-01 – User Authentication', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('[TC-AUTH-001] Validate login with valid credentials', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Expected Result TC-AUTH-001 + TC-AUTH-003
    // TC-AUTH-003 covered here — redirect validated below
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('[TC-AUTH-002] Validate error on invalid credentials', () => {
    cy.get('[data-test="username"]').type('wrong_user')
    cy.get('[data-test="password"]').type('wrong_pass')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match')

    cy.url().should('not.include', '/inventory.html')
  })

  it('[TC-AUTH-006] Validate login with empty fields', () => {
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username is required')

    cy.url().should('not.include', '/inventory.html')

  })

  it('[TC-AUTH-007] Validate login with only username', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Password is required')
    cy.url().should('not.include', '/inventory.html')
  })

})