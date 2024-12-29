// CAT-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// const faker = require('faker')

describe('testa tela CAT-TAT', () => {
    const user = { }

    beforeEach(() => {
        cy
        .visit('./src/index.html')

        user.firstName = 'testeFN';
        user.lastName = 'testeLN';
        user.email = 'testeEmail@gmail.com';
        user.textArea = 'testeTextArea';
    })
    
    it('teste title da pagina HTML', () => {
        cy
        .title()
        .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('teste name input', () => {
        cy
        .get('#firstName')
        .should('be.visible')
        .click()
        .type('Estevao')
        .should('have.value', 'Estevao')
    });

    it('preenche campos obrigatorios e envia formulario', () => {
        cy
        .get('input[name="firstName"]')
        .should('be.visible')
        .click()
        .type('Estevao')
        .should('have.value', 'Estevao')

        .get('input[name="lastName"]')
        .should('be.visible')
        .click()
        .type('Araujo')
        .should('have.value', 'Araujo')

        .get('#email')
        .should('be.visible')
        .click()
        .type('estevaoaraujo@gmail.com')
        .should('have.value', 'estevaoaraujo@gmail.com')

        .get('textarea[name="open-text-area"]')
        .should('be.visible')
        .click()
        .type('muito boa a aula')
        .should('have.value', 'muito boa a aula')

        .get('button[type="submit"]')
        .click()

        .get('.success')
        .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy
        .get('#email')
        .should('be.visible')
        .type('123testeerror')

        .get('button[type="submit"]')
        .click()

        .get('span[class="error"]')
        .should('be.visible')
    })

    it('valor nao numerico digitado em telefone deve retornar vazio', () => {
        cy
        .get('#phone')
        .type('asbcs')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy
        .get('#phone-checkbox')
        .check()
        
        .get('button[type="submit"]')
        .click()

        .get('span[class="error"]')
        .should('be.visible')
    })

    it('deve limpar o valor de um campo', () => {
        cy
        .get('#firstName')
        .click()
        .type('nome123')
        .should('have.value', 'nome123')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy
        .contains('button', 'Enviar')
        .click()

        .get('span[class="error"]')
        .should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy
        .fillMandatoryFieldsAndSubmit(user)
        
        cy
        .contains('button', 'Enviar')
        .click()

        .get('span[class="success"]')
        .should('be.visible')
    })

    it('carrega um valor de um select', () => {
        cy
        .get('.field select').select('blog')
        .should('have.value', 'blog')
    })

    it('carrega um valor de select pelo indice', () => {
        cy
        .get('.field select').select(2)
        .should('have.value', 'cursos')
    })

    it('checkar radiobutton e checkboxes', () => {
        cy
        .get('input[type="radio"][value="elogio"]')
        .check()
        .should('be.checked')

        cy
        .get('#email-checkbox')
        .check()
        .should('be.checked')
        
        cy
        .get('#phone-checkbox')
        .check()
        .should('be.checked')

        cy
        .fillMandatoryFieldsAndSubmit(user)

        cy
        .contains('button', 'Enviar')
        .click()

        cy
        .get('span[class="error"]')
        .should('be.visible')
    })

    it('desmarcando checkbox', () => {
        cy
        .get('#phone-checkbox')
        .check()
        .should('be.checked')
        .uncheck()
        .should('not.be.checked')
    })

    it('testando file', () => {
        cy
        .get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy
        .get('#privacy a')
        .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy
        .get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('CAC TAT - Política de privacidade').should('be.visible')    
    })

    it('verificar as mensagens e seus tempos', () => {
        cy.get('button[type="submit"]')
            .click()
        
        cy.clock()

        cy.get('span.error')
            .should('be.visible')
            
        cy.tick(3000)
            
        cy.get('span.error')
            .should('not.be.visible')
    })

    it('verificar mensagem de sucesso', () => {
        cy.fillMandatoryFieldsAndSubmit(user);

        cy.contains('button', 'Enviar')
            .click()

        cy.clock()
        
        cy.get('span.success')
            .should('be.visible')

        cy.tick(3000)

        cy.get('span.success')
            .should('not.be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')

        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('fazendo invoke setar valor no textArea', () => {
        cy.get('textarea[name="open-text-area"]')
            .invoke('val', 'teste 123 teste 1234')
            .should('have.value', 'teste 123 teste 1234')
      })

      it('testando requisicao API', () => {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) => {
            const { status, statusText, body } = response;
            expect(status).to.equal(200);
            expect(statusText).to.equal('OK');
            expect(response.body).to.include('CAC TAT');
        })
      })
})