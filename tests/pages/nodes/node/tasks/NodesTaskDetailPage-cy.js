describe("Nodes Task Detail Page", function() {
  beforeEach(function() {
    cy.configureCluster({
      mesos: "1-service-with-executor-task",
      nodeHealth: true
    });
  });

  context("Navigate to node task detail page", function() {
    it("navigates to node task detail page", function() {
      cy.visitUrl({ url: "/nodes", identify: true, fakeAnalytics: true });
      cy.get("tr a").eq(0).click();
      cy.get("tr a").eq(1).click();
      cy.hash().should("match", /nodes\/[a-zA-Z0-9-]+\/tasks\/[a-zA-Z0-9-]+/);

      cy.get("h1.configuration-map-heading").contains("Configuration");
    });

    it("loads page with data after hard reload", function() {
      cy.visitUrl({ url: "/nodes", identify: true, fakeAnalytics: true });
      cy.get("tr a").eq(0).click();
      cy.get("tr a").eq(1).click();
      cy.hash().should("match", /nodes\/[a-zA-Z0-9-]+\/tasks\/[a-zA-Z0-9-]+/);

      cy.reload(true);

      cy.get("h1.configuration-map-heading").contains("Configuration");
    });
  });
});