import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, map, mergeMap, tap } from 'rxjs';
import { AppState } from '../app.state';
import { CourseService } from 'src/app/services/course.service';
import * as CoursesActions from './courses.actions';
import * as LoadingActions from '../loading/loading.actions';
import { Course } from 'src/app/models/course.model';
import { Router } from '@angular/router';
import { Author } from 'src/app/models/author.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';

export const loadedCourseKey = makeStateKey('loadedCourse');
export const loadedAuthorsKey = makeStateKey('loadedAuthors');

@Injectable()
export class CoursesEffects {
  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private coursesService: CourseService,
    private router: Router,
    private transferState: TransferState
  ) {}

  $getCourses = createEffect(() => {
    return this.actions.pipe(
      ofType(CoursesActions.getCourses),
      mergeMap((action) => {
        this.store.dispatch(LoadingActions.setLoading({ value: true }));

        return from(
          this.coursesService.getCourses(action.start, action.count)
        ).pipe(
          map((data: any) => {
            const courses: Course[] = [];
            for (const d of data) {
              const course: Course = {
                id: d.id,
                title: d.name,
                description: d.description,
                creationDate: new Date(d.date),
                duration: d.length,
                topRated: d.isTopRated,
                authors: d.authors,
              };
              courses.push(course);
            }
            this.store.dispatch(LoadingActions.setLoading({ value: false }));

            return CoursesActions.getCoursesSuccess({ courses });
          })
        );
      })
    );
  });

  $searchCourses = createEffect(() => {
    return this.actions.pipe(
      ofType(CoursesActions.searchCourses),
      mergeMap((action) => {
        this.store.dispatch(LoadingActions.setLoading({ value: true }));

        return from(this.coursesService.searchCourses(action.fragment)).pipe(
          map((data: any) => {
            const courses: Course[] = [];
            for (const d of data) {
              const course: Course = {
                id: d.id,
                title: d.name,
                description: d.description,
                creationDate: new Date(d.date),
                duration: d.length,
                topRated: d.isTopRated,
                authors: d.authors,
              };
              courses.push(course);
            }

            this.store.dispatch(LoadingActions.setLoading({ value: false }));
            return CoursesActions.getCoursesSuccess({ courses });
          })
        );
      })
    );
  });

  $deleteCourse = createEffect(() => {
    return this.actions.pipe(
      ofType(CoursesActions.deleteCourse),
      mergeMap((action) => {
        this.store.dispatch(LoadingActions.setLoading({ value: true }));

        return from(this.coursesService.removeCourse(action.id)).pipe(
          map(() => {
            this.store.dispatch(LoadingActions.setLoading({ value: false }));
            return CoursesActions.getCourses({ start: 0, count: 5 });
          })
        );
      })
    );
  });

  $getCourse = createEffect(() => {
    return this.actions.pipe(
      ofType(CoursesActions.getCourse),
      mergeMap((action) => {
        this.store.dispatch(LoadingActions.setLoading({ value: true }));

        return from(this.coursesService.getCourse(action.id)).pipe(
          map((data: any) => {
            const course: Course = {
              id: data.id,
              title: data.name,
              description: data.description,
              creationDate: new Date(data.date),
              duration: data.length,
              topRated: data.isTopRated,
              authors: data.authors,
            };

            this.store.dispatch(LoadingActions.setLoading({ value: false }));

            this.transferState.set(loadedCourseKey, course as any);

            return CoursesActions.getCourseSuccess({ course });
          })
        );
      })
    );
  });

  $updateCourse = createEffect(
    () => {
      return this.actions.pipe(
        ofType(CoursesActions.updateCourse),
        mergeMap((action) => {
          this.store.dispatch(LoadingActions.setLoading({ value: true }));

          return from(
            this.coursesService.updateCourse(
              action.id,
              action.title,
              action.description,
              action.duration,
              action.creationDate,
              action.isTopRated,
              action.authors
            )
          ).pipe(
            tap(() => {
              this.store.dispatch(LoadingActions.setLoading({ value: false }));
              this.router.navigate(['/courses']);
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  $createCourse = createEffect(
    () => {
      return this.actions.pipe(
        ofType(CoursesActions.createCourse),
        mergeMap((action) => {
          this.store.dispatch(LoadingActions.setLoading({ value: true }));

          return from(
            this.coursesService.createCourse(
              action.title,
              action.description,
              action.duration,
              action.creationDate,
              action.isTopRated,
              action.authors
            )
          ).pipe(
            tap(() => {
              this.store.dispatch(LoadingActions.setLoading({ value: false }));
              this.router.navigate(['/courses']);
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  $getAuthors = createEffect(() => {
    return this.actions.pipe(
      ofType(CoursesActions.getAuthors),
      mergeMap(() => {
        this.store.dispatch(LoadingActions.setLoading({ value: true }));

        return from(this.coursesService.getAuthors()).pipe(
          map((data: Author[]) => {
            this.store.dispatch(LoadingActions.setLoading({ value: false }));

            this.transferState.set(loadedAuthorsKey, data as any);

            return CoursesActions.getAuthorsSuccess({ authors: data });
          })
        );
      })
    );
  });
}
