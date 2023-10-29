
describe('login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  
  it("login page should render correctly", () => {
    cy.get('[data-cy="login-container"]')
      .should("exist")
    cy.get('[data-cy="actor-label"]')
      .should("exist")
    cy.get("[data-cy='logo-login']")
      .should("exist")
    cy.get("[data-cy='bem-vindo-header']")
      .should("exist")
    cy.get("[data-cy='user-input']")
      .should("exist")
    cy.get("[data-cy='pswd-input']")
      .should("exist")
    cy.get("[data-cy='lembrar-label']")
      .should("exist")
    cy.get("[data-cy='esqueci-label']")
      .should("exist")

    //switch button should exist and be available to click
    cy.get('[data-cy="switch-actor-btn"]').should("exist").click()
    //should switch the actor
    cy.get('[data-cy="actor-label"]')
      .should(($p) => {
        expect($p.first()).to.contain("Fornecedor")
      })
    //placeholder should change
    cy.get("[data-cy='user-inputfield'][placeholder='ID Login']")
      .should("exist")

    //click again
    cy.get('[data-cy="switch-actor-btn"]').should("exist").click()
    //switch back to Colaborador
    cy.get('[data-cy="actor-label"]')
      .should(($p) => {
        expect($p.first()).to.contain("Colaborador")
      })
    //placeholder should change
    cy.get("[data-cy='user-inputfield'][placeholder='Matrícula']")
      .should("exist")
    
    //checkbox should be working
    cy.get("[data-cy='lembrar-check']")
      .check()
      .should("be.checked")


    cy.get("[data-cy='entrar-btn']")
      .should("exist")
      .click()
    cy.get("[data-cy='auth-error-msg']")
      .should("exist")
  })

  // it("login as employee with the correct info")
})