import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';

export const editorjsConfig = {

    holder: 'editorjs',
    tools: {
        Marker :{
            class : Marker,
            shortcut : 'CMD+SHIFT+M'
        },
        header: {
            class: Header,
            inlineToolbar: [
                'link', 'bold', 'italic'
            ]
        },
        list: {
            class: List,
            inlineToolbar: [
                'link','bold'
            ]
        },
        embed : {
            class : Embed,
            inlineToolbar: false,
            config: {
                services: {
                    youtube: true,
                    coub: true
                }
            }
        }
    },
}
