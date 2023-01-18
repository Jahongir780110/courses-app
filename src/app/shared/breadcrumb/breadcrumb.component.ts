import { Component, Input } from '@angular/core';

interface breadCrumbRoute {
  name: string;
  absolutePath: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
  @Input() routes: breadCrumbRoute[] = [];
}
