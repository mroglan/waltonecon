import { GetServerSidePropsContext } from "next";

export function redirectToLogin(ctx:GetServerSidePropsContext) {
    ctx.res.writeHead(302, {
        Location: `${process.env.BASE_ROUTE}/admin/login`
    })
    ctx.res.end()
}

export function redirectToAdminDashboard(ctx:GetServerSidePropsContext) {
    ctx.res.writeHead(302, {
        Location: `${process.env.BASE_ROUTE}/admin`
    })
    ctx.res.end()
}