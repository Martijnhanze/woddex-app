import EditorJS from "@editorjs/editorjs";
import {editorjsConfig} from "./article-editor.config";
import {debounceTime, Observable, skip} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Component, OnInit} from "@angular/core";

@UntilDestroy()
@Component({
    selector: 'app-article-editor',
    templateUrl: './article-editor.component.html',
    styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {

    editorData: any;
    editor: EditorJS;
    editorObserver: MutationObserver;
    parser: any;
    parsedData: any;

    isEditing = true;

    constructor() {
    }

    ngOnInit(): void {
        this.editor = new EditorJS(editorjsConfig)
        this.detectEditorChanges().pipe(
            debounceTime(200),
            skip(1),
            untilDestroyed(this)
        ).subscribe(data => {
            this.editor.save().then((outputData) => {
                this.editorData = this.parsedData = this.convertDataToHtml(outputData.blocks);
            });
        });
    }
    convertDataToHtml(blocks) {
        let convertedHtml = "";
        blocks.map(block => {
            switch (block.type) {
                case "header":
                    convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                    break;
                case "embded":
                    convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
                    break;
                case "paragraph":
                    if (!block.data.text.length) {
                        convertedHtml += `<br>`;
                    }
                    convertedHtml += `<p>${block.data.text}</p>`;
                    break;
                case "delimiter":
                    convertedHtml += "<hr />";
                    break;
                case "image":
                    convertedHtml += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
                    break;
                case "list":
                    convertedHtml += "<ul>";
                    block.data.items.forEach(function(li) {
                        convertedHtml += `<li>${li}</li>`;
                    });
                    convertedHtml += "</ul>";
                    break;
                default:
                    console.log("Unknown block type", block.type);
                    break;
            }
        });
        return convertedHtml;
    }

    ngOnDestroy(): void {
        this.editorObserver.disconnect();
    }

    detectEditorChanges(): Observable<any> {

        return new Observable(observer => {

            const editorDom = document.querySelector('#editorjs');
            const config = {attributes: true, childList: true, subtree: true};

            this.editorObserver = new MutationObserver((mutation) => {
                observer.next(mutation);
            })

            this.editorObserver.observe(editorDom, config);

        })
    }

    insertDemoText() {
        const data = {
            "time": 1550476186479,
            "blocks": [
                {
                    "id": "oUq2g_tl8y",
                    "type": "header",
                    "data": {
                        "text": "Editor.js",
                        "level": 2
                    }
                },
                {
                    "id": "zbGZFPM-iI",
                    "type": "paragraph",
                    "data": {
                        "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
                    }
                },
                {
                    "id": "qYIGsjS5rt",
                    "type": "header",
                    "data": {
                        "text": "Key features",
                        "level": 3
                    }
                },
                {
                    "id": "XV87kJS_H1",
                    "type": "list",
                    "data": {
                        "style": "unordered",
                        "items": [
                            "It is a block-styled editor",
                            "It returns clean data output in JSON",
                            "Designed to be extendable and pluggable with a simple API"
                        ]
                    }
                },
                {
                    "id": "AOulAjL8XM",
                    "type": "header",
                    "data": {
                        "text": "What does it mean «block-styled editor»",
                        "level": 3
                    }
                },
                {
                    "id": "cyZjplMOZ0",
                    "type": "paragraph",
                    "data": {
                        "text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
                    }
                }
            ],
            "version": "2.8.1"
        }
        this.editor.render(data);
    }


    toggleEditMode(): void {
        this.isEditing = !this.isEditing;
    }

    get editModeText(): string {
        if (this.isEditing) {
            return 'Stoppen met bewerken';
        } else {
            return 'Start met bewerken';
        }
    }

}