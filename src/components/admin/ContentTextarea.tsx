import {useRef, useEffect, useState} from 'react'

export default function ContentTextarea({content, changeContent}) {

    const [serverSide, setServerSide] = useState(true)
    const [contentEditor, setContentEditor] = useState({
        CKEditor: null,
        ClassicEditor: null,
        BalloonEditor: null,
        DocumentEditor: null
    })

    useEffect(() => {
        setContentEditor({
            CKEditor: require('@ckeditor/ckeditor5-react'),
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
            BalloonEditor: null, //require('@ckeditor/ckeditor5-build-balloon'),
            DocumentEditor: null // require('@ckeditor/ckeditor5-build-decoupled-document')
        })
        setServerSide(false)
    }, [])

   const handleChange = (e, editor) => {
       const data = editor.getData()
       changeContent(data)
   }

   useEffect(() => {
       if(contentEditor.ClassicEditor) {
           contentEditor.ClassicEditor.builtinPlugins.map(el => console.log(el.pluginName))
       }
   }, [contentEditor])

   useEffect(() => {
       if(contentEditor.ClassicEditor) console.log(contentEditor.ClassicEditor.builtinPlugins)
   })

    return (
        <div>
            {!serverSide && <contentEditor.CKEditor data={content} editor={contentEditor.ClassicEditor} onChange={handleChange}
            // config={{toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'bulletedList', 'numberedList', 'insertUnderline', '|', 'link', 'InsertTable',
            //  'ImageUpload', 'MediaEmbed', '|', 'undo', 'redo'], 
            //  plugins: [
            //      ...contentEditor.ClassicEditor.builtinPlugins
            //  ]}}
            />}
        </div>
    )
}