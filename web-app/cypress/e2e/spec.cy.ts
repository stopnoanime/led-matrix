describe('LED-MATRIX', () => {
  let Port: any;

  beforeEach(() => {
    //Mock serial port
    Port = {
      open: () => Promise.resolve(),
      close: cy.stub().as('close'),
      writable: {
        getWriter: () => ({
          write: cy.stub().as('write'),
          releaseLock: () => {} 
        })
      }
    };
    
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.serial, "requestPort").resolves(Port)
      }
    })
  })

  it('Visits the project page', () => {
    cy.contains('8x8 LED Matrix')
  })

  it('Connects to serial port and prints text', () => {
    //Start button should be disabled when not connected to serial
    cy.contains('Start').should('be.disabled');

    //Connect to serial port
    cy.contains('Connect').click();

    //Should connect
    cy.contains('Disconnect');
    cy.contains('Start').should('be.enabled');

    //Enter text to print
    cy.get('textarea').type('text');

    //Start printing
    cy.contains('Start').click();

    //It should visualize printed text
    cy.get('app-dot-display span.bg-gray-900').should('have.length.at.least', 10)

    //It should highlight printed text
    cy.get('div.txt-area span').should('contain', 'e')

    //It should print data to serial port
    cy.get('@write').should('be.called')

    //Stop printing 
    cy.contains('Stop').click();

    //Stop button should change to Start button
    cy.contains('Start')
  })

  it('Disconnects from serial port', () => {
    cy.contains('Connect').click();
    cy.contains('Start').should('be.enabled');

    //Disconnect
    cy.contains('Disconnect').click();

    //Should disconnect from serial port
    cy.get('@close').should('be.called')

    //Should disable start button
    cy.contains('Start').should('be.disabled');
  })
})
