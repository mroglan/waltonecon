import { NextApiRequest, NextApiResponse } from "next";
import database from '../../database/database'
import {ObjectId} from 'mongodb'
import {IClientResource, IResource} from '../../database/modelInterfaces'
import {verifyUser} from '../../utils/verifyUser'

interface Content extends Omit<IClientResource, '_id' | 'date'> {
    date: Date;
}

async function createCard(content:Content) {
    const db = await database()
    const newCard = await db.collection('resources').insertOne(content)
    return newCard
}

async function modifyCards(resources:IResource[]) {
    const db = await database()
    const idArray = resources.map(resource => resource._id)
    
    await Promise.all(idArray.map((id, i) => db.collection('resources').updateOne({'_id': id}, {'$set': {...resources[i]}})))
}

async function deleteCards(ids:ObjectId[]) {
    const db = await database()

    await db.collection('resources').deleteMany({'_id': {'$in': ids}})
}

export default verifyUser(async function ModifyCards(req:NextApiRequest, res:NextApiResponse) {

    try {
        if(req.body.operation === 'create') {
            req.body.content = {...req.body.content, date: new Date(Date.now())}
            const newCard = await createCard(req.body.content)
            return res.status(200).json(newCard.ops[0])
        }

        if(req.body.operation === 'modify') {
            req.body.resources = req.body.resources.map(resource => (
                {...resource, date: new Date(resource.date), _id: new ObjectId(resource._id)}
            ))
            await modifyCards(req.body.resources)
            return res.status(200).json({msg: 'Successful update'})
        }

        if(req.body.operation === 'delete') {
            const objectIds = req.body.ids.map(id => new ObjectId(id))
            await deleteCards(objectIds)
            return res.status(200).json({msg: 'Successful deletion'})
        }

        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: 'Internal Server Error'})
    }
})