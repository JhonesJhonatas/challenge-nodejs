import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'
import { serialize } from 'node:v8'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search,
            }: null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body
            const completed_at = null;
            const created_at = Date();
            const updated_at = Date();

            const task = { 
                id: randomUUID(),
                title,
                description,
                completed_at,
                created_at,
                updated_at
            }

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { id } = req.params
            const { title, description } = req.body
            const updated_at = Date();
            const data = { updated_at }

            if(title){
                Object.assign(data, { title })
            }

            if(description){
                Object.assign(data, { description })
            }

            database.update('tasks', id, data)


           return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { id } = req.params

            const completed_at = Date();
            
            database.update('tasks', id, {
                completed_at
            })

           return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { id } = req.params
            
            database.delete('tasks', id)

           return res.writeHead(204).end()
        }
    }
]