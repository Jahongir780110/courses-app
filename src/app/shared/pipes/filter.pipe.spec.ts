import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let filterPipe: FilterPipe;

  beforeEach(() => {
    filterPipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(filterPipe).toBeTruthy();
  });

  it('should filter courses', () => {
    const mockCourses = [
      {
        id: 1,
        title: 'Video Course 1. Name tag',
        duration: 88,
        creationDate: new Date(2022, 11, 29),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: true,
      },
      {
        id: 2,
        title: 'Video Course 2. Name tag',
        duration: 27,
        creationDate: new Date(2023, 2, 12),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: false,
      },
      {
        id: 3,
        title: 'Video Course 3. Name tag',
        duration: 125,
        creationDate: new Date(2018, 8, 3),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: true,
      },
    ];
    const filteredCourses = filterPipe.transform(mockCourses, '2');

    expect(filteredCourses).toEqual([
      {
        id: 2,
        title: 'Video Course 2. Name tag',
        duration: 27,
        creationDate: new Date(2023, 2, 12),
        description:
          "Learn about where you can find course desciptions, what information they include, how they work, and details about various components of a coursedescription. Course descriptions report informationa bout a universityor colleges classes. They're published both in course catalogs thatoutline degree requirements and in course schedules that containdescriptions for all courses offered during.",
        topRated: false,
      },
    ]);
  });
});
