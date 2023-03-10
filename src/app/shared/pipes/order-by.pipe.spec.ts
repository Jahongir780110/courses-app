import { Course } from 'src/app/models/course.model';
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let orderByPipe: OrderByPipe;

  beforeEach(() => {
    orderByPipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(orderByPipe).toBeTruthy();
  });

  it('should order by creation date', () => {
    const mockCourses: Course[] = [
      {
        id: 1,
        title: 'Video Course 1. Name tag',
        duration: 88,
        creationDate: new Date(2022, 11, 29),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: true,
        authors: [],
      },
      {
        id: 2,
        title: 'Video Course 2. Name tag',
        duration: 27,
        creationDate: new Date(2023, 2, 12),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: false,
        authors: [],
      },
      {
        id: 3,
        title: 'Video Course 3. Name tag',
        duration: 125,
        creationDate: new Date(2018, 8, 3),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: true,
        authors: [],
      },
    ];
    const orderedCourses = orderByPipe.transform(mockCourses);

    expect(orderedCourses).toEqual([
      {
        id: 2,
        title: 'Video Course 2. Name tag',
        duration: 27,
        creationDate: new Date(2023, 2, 12),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: false,
        authors: [],
      },
      {
        id: 1,
        title: 'Video Course 1. Name tag',
        duration: 88,
        creationDate: new Date(2022, 11, 29),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: true,
        authors: [],
      },
      {
        id: 3,
        title: 'Video Course 3. Name tag',
        duration: 125,
        creationDate: new Date(2018, 8, 3),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: true,
        authors: [],
      },
    ]);
  });
});
