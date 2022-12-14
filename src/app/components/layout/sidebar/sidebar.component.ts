import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @ViewChild('sidebar') sidebar: SidebarComponent;

    constructor() {
    }

    ngOnInit(): void {
    }
}
