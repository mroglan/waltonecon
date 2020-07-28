import {convertFromRaw} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'

export default function getHTMLFromContentState(content:string) {

    const contentState = convertFromRaw(JSON.parse(content))

    const htmlText = stateToHTML(contentState, {
        inlineStyles: {
            HIGHLIGHT: {
                style: {backgroundColor: 'yellow'}
            }
        }
    })

    return htmlText
}