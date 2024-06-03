// [CRUD] - Create, Read, Update, Delete

const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.json())

function startServer() {
    app.listen(port, () => {
        console.log(`Backend server listening at http://localhost:${port}`)
    })
}

module.exports = { startServer }

const dataFilePath = 'data.json'

// Função para ler dados json

function readData() {
    try {
        return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'))
    } catch (error) {
        console.error('Error reading data:', error)
        return []
    }
}

// Função para escrever dados json

function writeData(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8')
    } catch (error) {
        console.error('Error writing data:', error)
    }
}

// Criando

app.post('/api/items', (req, res) => {
    const newData = req.body
    const data = readData()
    data.unshift(newData)
    writeData(data)
    res.json(newData)
})

// Lendo

app.get('/api/items', (req, res) => {
    const searchTerm = req.query.search
    let data = readData()
    if(searchTerm) {
        data = data.filter(item => 
            item.title.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        )
    }
    res.json(data)
})

app.get('/api/items/:id', (req, res) => {
    const itemId = req.params.id
    const data = readData()
    const video = data.find(item => item.id === itemId)

    if(!video) {
        return res.status(404).json({ error: 'Video not found' })
    }
    res.json(video)
})

// Atualizando

app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id
    const updatedData = req.body
    let data = readData()
    data = data.map(item => (item.id === itemId ? updatedData : item))
    writeData(data)
    res.json(updatedData)
})

// Deletando

app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id
    let data = readData()
    data = data.filter(item => item.id !== itemId)
    writeData(data)
    res.sendStatus(204)
})
