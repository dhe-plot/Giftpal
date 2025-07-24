import { createServer } from 'vite'

async function startDevServer() {
  try {
    console.log('Starting Vite development server...')

    const server = await createServer({
      server: {
        port: 5173,
        host: 'localhost',
        open: true
      }
    })

    await server.listen()

    console.log('Development server started successfully!')
    console.log('Local: http://localhost:5173')

  } catch (error) {
    console.error('Error starting development server:', error)
  }
}

startDevServer()
