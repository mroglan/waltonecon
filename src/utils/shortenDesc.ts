import {IClientResource} from '../database/modelInterfaces'

export default function shortenDesc(resources:IClientResource[]) {
    return resources.map(resource => {
        const copy = {...resource}
        const desc = copy.desc
        if(desc.length > 50) {
            copy.desc = desc.substring(0, 50) + '...'
        }
        return copy
    })
}