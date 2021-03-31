app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })