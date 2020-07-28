

export default async function updateContent(text:string, component:string) {
    
    const res = await fetch(`${process.env.BASE_ROUTE}/api/updatecontent`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: text,
            component: component
        })
    })

    return res.status
}