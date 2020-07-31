import { NextApiRequest, NextApiResponse } from "next";
import database from '../../database/database'
import {OAuth2Client} from 'google-auth-library'
import {sign} from 'jsonwebtoken'
import cookie from 'cookie'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

async function verifyCorrectGoogleAccount(googleId:string) {
    const db = await database()

    const user = await db.collection('users').findOne({'googleId': googleId})

    if(!user) {
        throw new Error('This is not our club\'s gmail!')
    }
}

export default async function Login(req:NextApiRequest, res:NextApiResponse) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()

        console.log('payload', payload)

        await verifyCorrectGoogleAccount(payload.sub)

        const claims = {
            email: payload.email,
            pic: payload.picture
        }

        const jwt = sign(claims, process.env.SIGNATURE, {expiresIn: '48hr'})

        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 172800,
            path: '/'
        }))

        return res.status(200).json({msg: 'successful i guess'})
    } catch(e) {
        console.log(e)
        return res.status(401).json({msg: e.message})
    }
}