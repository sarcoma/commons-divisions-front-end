const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
    .prepare()
    .then(() => {
        const server = express()

        server.get('/:page', (req, res) => {
          const actualPage = '/'
          const queryParams = { page: req.params.id }
          app.render(req, res, actualPage, queryParams)
        })

        server.get('/commons-division/:id', (req, res) => {
          const actualPage = '/commons-division'
          const queryParams = { id: req.params.id }
          app.render(req, res, actualPage, queryParams)
        })

        server.get('/member-of-parliament/:id', (req, res) => {
          const actualPage = '/member-of-parliament'
          const queryParams = { id: req.params.id }
          app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, err => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })
