describe('LED-MATRIX', () => {
  let Port: any;

  beforeEach(() => {
    //Mock serial port
    Port = {
      open: cy.stub().as('open').resolves(),
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
        const mockSerial = {requestPort: cy.stub().resolves(Port)};

        if('serial' in win.navigator) cy.stub(win.navigator, "serial").value(mockSerial);
        else (win.navigator as any).serial = mockSerial;
      }
    })
  })

  it('Shows message when there is no serial available', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        const {serial, ...navWithoutSerial} = win.navigator;
        cy.stub(win, 'navigator').value(navWithoutSerial)
      }
    })

    cy.get('#serialWarning');
  })

  it('Renders the main page', () => {
    cy.contains('8x8 LED Matrix');

    //Should render sub components
    cy.get('app-dot-display');
    cy.get('app-text-input');
    cy.get('app-settings-menu');

    //Speed slider should be initialized to 0.5
    cy.get('app-settings-menu mat-slider input').should('have.value', 0.5)

    //Default animation should be left -> right
    cy.get('app-settings-menu select').should('have.value', 'left')
  })
  
  it('Connects to serial port', () => {
    //Start button should be disabled when not connected to serial
    cy.contains('Start').should('be.disabled');

    //Connect to serial port
    cy.contains('Connect').click();

    //Should connect
    cy.get('@open').should('be.called')
    cy.contains('Disconnect');
    cy.contains('Start').should('be.enabled');
  })

  it('Disconnects from serial port', () => {
    cy.contains('Connect').click();

    //Disconnect
    cy.contains('Disconnect').click();

    //Should disconnect from serial port
    cy.get('@close').should('be.called')

    //Should disable start button
    cy.contains('Start').should('be.disabled');
  })

  it('Writes data to serial port', () => {
    cy.contains('Connect').click();

    //Enter text to print
    cy.get('textarea').type('text');
    
    //Start printing
    cy.contains('Start').click();

    //It should print data to serial port
    cy.get('@write').should('be.called')
  })

  it('Highlights printed text', () => {
    //Increase print speed
    cy.get("mat-slider input").invoke('val', 1).trigger('input');

    //Start printing
    cy.contains('Connect').click();
    cy.get('textarea').type('text');
    cy.contains('Start').click();

    //It should highlight printed text
    cy.get('div.txt-area span').should('contain', 't')
    cy.get('div.txt-area span').should('contain', 'e')
    cy.get('div.txt-area span').should('contain', 'x')
    cy.get('div.txt-area span').should('contain', 't')
  })

  it('Visualizes printed text', () => {
    //Start printing
    cy.contains('Connect').click();
    cy.get('textarea').type('text');
    cy.contains('Start').click();

    //It should visualize printed text
    cy.get('app-dot-display span.bg-gray-900').should('have.length.at.least', 10)
  })

  it('Stops printing', () => {
    //Start printing
    cy.contains('Connect').click();
    cy.get('textarea').type('text');
    cy.contains('Start').click();

    //Stop printing 
    cy.contains('Stop').click();

    //Stop button should change back to Start button
    cy.contains('Start')
  })
})
