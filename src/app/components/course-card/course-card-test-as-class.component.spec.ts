import { CourseCardComponent } from './course-card.component';

describe('CourseCardTestAsClass', () => {
  it('should emit "edit" when editCourse() is called', () => {
    const component = new CourseCardComponent();
    const spy = spyOn(component.edit, 'emit');

    component.course = {
      id: 5,
      title: 'Sample title',
      duration: 'Sample duration',
      creationDate: 'Sample creation date',
      description: 'Sample description',
    };
    component.editCourse();

    expect(spy).toHaveBeenCalledOnceWith(component.course.id);
  });

  it('should emit "delete" when delete() is called', () => {
    const component = new CourseCardComponent();
    const spy = spyOn(component.delete, 'emit');

    component.course = {
      id: 5,
      title: 'Sample title',
      duration: 'Sample duration',
      creationDate: 'Sample creation date',
      description: 'Sample description',
    };
    component.deleteCourse();

    expect(spy).toHaveBeenCalledOnceWith(component.course.id);
  });
});
