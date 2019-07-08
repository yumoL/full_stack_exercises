
/* eslint-disable no-undef */
describe('Blog app', function () {
  const username = 'yumo'
  const name = 'luoyumo'

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: username,
      name: name,
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('yumo')
      cy.get('#password').type('123')
      cy.contains('login').click()
    })

    it('name of the user is shown', function () {
      cy.contains('yumo logged in')
    })

    it('logged in user can log out', function () {
      cy.contains('logout').click()
      cy.get('form').within(($form) => {
        cy.contains('username')
        cy.contains('password')
      })
    })

    describe('when a new blog is created', function () {
      const newTitle = 'new title'
      const newUrl = 'new url'
      beforeEach(function () {
        cy.contains('all blogs').click()
        cy.contains('create new').click()
        cy.get('#title').type(newTitle)
        cy.get('#author').type('new author')
        cy.get('#url').type('new url')
        cy.contains('add a blog').click()
      })

      it('the title of the new blog is shown', function () {
        cy.contains(newTitle)
      })

      describe('when checking all users', function () {
        beforeEach(function () {
          cy.contains('all users').click()
        })

        it('can show username and the number of blogs that each user added', function () {
          cy.contains(username)
          cy.contains(1)
        })

        it('can show titles of blogs that the user added when click the username', function() {
          cy.contains(username).click()
          cy.contains(newTitle)
        })


      })

      describe('when click the title', function () {
        beforeEach(function () {
          cy.get('#toDetail').contains(newTitle).click()
        })
        it('detail can be shown', function () {
          cy.contains(newUrl)
          cy.contains('0 likes')
          cy.contains(`added by ${name}`)
          cy.get('form').within(($form) => {
            cy.contains('new comment')
          })
        })

        it('can like a blog', function () {
          cy.contains('0 likes')
          cy.get('button').contains('like').click()
          cy.contains('1 like')
          cy.get('button').contains('like').click()
          cy.contains('2 likes')
        })

        it('can comment a blog', function () {
          const newComment = 'great article'
          cy.get('#comment').type(newComment)
          cy.get('button').contains('comment').click()
          cy.contains(newComment)
        })

      })

    })
  })

  it('cannot login when username or password wrong', function () {
    cy.get('#username').type('wronguUsername')
    cy.get('#password').type('wrongPassword')
    cy.contains('login').click()
    cy.get('form').within(($form) => {
      cy.contains('username')
      cy.contains('password')
    })
  })


})