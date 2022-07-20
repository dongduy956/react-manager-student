import configRoute from '~/config';
import Class, { AddClass } from '~/pages/Class';
import Point, { AddPoint } from '~/pages/Point';
import Student, { AddStudent } from '~/pages/Student';
import Subject, { AddSubject } from '~/pages/Subject';
import Teacher, { AddTeacher } from '~/pages/Teacher';

export const publicRoutes = [
    {
        path: configRoute.routes.point,
        component: Point,
        addRoute: configRoute.routes.addPoint,
    },
    {
        path: configRoute.routes.teacher,
        component: Teacher,
        addRoute: configRoute.routes.addTeacher,
    },

    {
        path: configRoute.routes.student,
        component: Student,
        addRoute: configRoute.routes.addStudent,
    },
    {
        path: configRoute.routes.subject,

        component: Subject,
        addRoute: configRoute.routes.addSubject,
    },
    {
        path: configRoute.routes.class,
        component: Class,
        addRoute: configRoute.routes.addClass,
    },
    {
        path: configRoute.routes.addPoint,
        component: AddPoint,
    },
    {
        path: configRoute.routes.addTeacher,
        component: AddTeacher,
    },
    {
        path: configRoute.routes.addStudent,
        component: AddStudent,
    },
    {
        path: configRoute.routes.addSubject,
        component: AddSubject,
    },
    {
        path: configRoute.routes.addClass,
        component: AddClass,
    },
];
export const privateRoutes = [];
