const { v4: uuidv4 } = require("uuid");

describe("payment", () => {
  it("user can make payment", () => {
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();

    let oldBalance;
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => (oldBalance = $balance.text()));
    cy.findByRole("button", { name: /new/i }).click();
    cy.findByRole("textbox").type("devon becker");
    cy.findByText(/devon becker/i).click();

    const paymentAmount = "5.00";
    cy.findByPlaceholderText(/amount/i).type(paymentAmount);
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();

    cy.findByRole("button", { name: /return to transactions/i }).click();
    cy.findByRole("tab", { name: /mine/i }).click();
    cy.findByText(note).click({ force: true });

    cy.findByText(`-$${paymentAmount}`).should("be.visible");
    cy.findByText(note).should("be.visible");

    // cy.get('[data-test="sidenav-user-balance"]').then(($balance) => {
    //   const convertedAllBalance = oldBalance.replace(/\$|,/g, "");
    //   const convertedAllBalance = balance.text().replace(/\$|,/g, "");
    // }));
  });
});
