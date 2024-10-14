describe('cypress test', () => {
    it('my first test', () => {
      cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
      cy.contains('Table Data').click();
      
      const jsonData = [
        { name: "Bob", age: 20, gender: "male" },
        { name: "George", age: 42, gender: "male" },
        { name: "Sara", age: 42, gender: "female" },
        { name: "Conor", age: 40, gender: "male" },
        { name: "Jennifer", age: 42, gender: "female" }
      ];
  
      const jsonString = JSON.stringify(jsonData, null, 2);
  
      cy.get("textarea[id='jsondata']")
        .clear()
        .type(jsonString);
      
      cy.get('button[id="refreshtable"]').click();
      
      // Wait for the table to be visible
      cy.get('table').should('be.visible');
      
      // Optional: Check that the correct number of rows is displayed
      //cy.get('tr').should('have.length', jsonData.length);
      
      jsonData.forEach((item, index) => {
        cy.get('tr').eq(index + 1).within(() => { // Adjusting for header row
          cy.get('td').should('have.length', 3); // Check that there are 3 data cells
          cy.get('td').eq(0).should('have.text', item.name);    
          cy.get('td').eq(1).should('have.text', item.age.toString());
          cy.get('td').eq(2).should('have.text', item.gender);
        });
      });
    });
  });
  