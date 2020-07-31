import {parseCookies} from 'nookies'
import {verify} from 'jsonwebtoken'
import {GetServerSidePropsContext} from 'next'

export default function checkIsAuthenticated(ctx:GetServerSidePropsContext) {

    const {auth} = parseCookies(ctx)

    return new Promise(resolve => {
        verify(auth, process.env.SIGNATURE, async (err, decoded) => {
            if(!err && decoded) {
                resolve(true)
            }
            resolve(false)
        })
    })
}