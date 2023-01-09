import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show routes correctly', () => {
    component.routes = [
      {
        name: 'Courses',
        absolutePath: '/courses',
      },
      {
        name: 'Add Course',
        absolutePath: '/courses/new',
      },
    ];
    fixture.detectChanges();

    expect(
      template.querySelectorAll('.breadcrumb-item a')[0].textContent
    ).toContain(component.routes[0].name);

    expect(
      template.querySelectorAll('.breadcrumb-item a')[1].textContent
    ).toContain(component.routes[1].name);
  });
});
