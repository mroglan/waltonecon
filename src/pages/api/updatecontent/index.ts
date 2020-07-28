import { NextApiRequest, NextApiResponse } from "next";
import database from '../../../database/database'

export default async function UpdateAbout(req:NextApiRequest, res:NextApiResponse) {

    try {
        const db = await database()

        await db.collection('content').updateOne({'component': req.body.component}, {'$set': {'content': req.body.content}})

        return res.status(200).json({msg: 'Successful update :)'})
        
    } catch(e) {
        console.log(e)

        return res.status(500).json({msg: 'Internal Server Error'})
    }
}