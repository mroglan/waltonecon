import { NextApiRequest, NextApiResponse } from "next";
import database from '../../database/database'

export default async function AddEmail(req:NextApiRequest, res:NextApiResponse) {

    try {
        const db = await database()

        const {emails} = await db.collection('emails').findOne({})

        if(emails.includes(req.body.email)) {
            return res.status(409).json({msg: 'Email already registered'})
        }

        await db.collection('emails').updateOne({}, {'$push': {'emails': req.body.email}})

        return res.status(200).json({msg: 'Email successfully added'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: 'Internal Server Error'})
    }
}