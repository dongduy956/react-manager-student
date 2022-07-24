import { configRoutes, configTitles } from '~/config';
import Class, { AddClass, UpdateClass } from '~/pages/Class';
import Point, { AddPoint, UpdatePoint } from '~/pages/Point';
import Login from '~/pages/Login';
import Student, { AddStudent, UpdateStudent } from '~/pages/Student';
import Subject, { AddSubject, UpdateSubject } from '~/pages/Subject';
import Teacher, { AddTeacher, UpdateTeacher } from '~/pages/Teacher';

export const publicRoutes = [
    {
        path: configRoutes.routes.login,
        component: Login,
        addRoute: configRoutes.routes.addPoint,
        layout: null,
    },
];
export const privateRoutes = [
    
    {
        path: configRoutes.routes.point,
        component: Point,
        addRoute: configRoutes.routes.addPoint,
    },
    {
        path: configRoutes.routes.teacher,
        component: Teacher,
        addRoute: configRoutes.routes.addTeacher,
    },

    {
        path: configRoutes.routes.student,
        component: Student,
        addRoute: configRoutes.routes.addStudent,
    },
    {
        path: configRoutes.routes.subject,
        component: Subject,
        addRoute: configRoutes.routes.addSubject,
    },
    {
        path: configRoutes.routes.class,
        component: Class,
        addRoute: configRoutes.routes.addClass,
    },
    //add
    {
        path: configRoutes.routes.addPoint,
        component: AddPoint,
        title: configTitles.title.addPoint,
    },
    {
        path: configRoutes.routes.addTeacher,
        component: AddTeacher,
        title: configTitles.title.addTeacher,
    },
    {
        path: configRoutes.routes.addStudent,
        component: AddStudent,
        title: configTitles.title.addStudent,
    },
    {
        path: configRoutes.routes.addSubject,
        component: AddSubject,
        title: configTitles.title.addSubject,
    },
    {
        path: configRoutes.routes.addClass,
        component: AddClass,
        title: configTitles.title.addClass,
    },
    //update
    {
        path: configRoutes.routes.updatePoint,
        component: UpdatePoint,
        title: configTitles.title.updatePoint,
    },
    {
        path: configRoutes.routes.updateTeacher,
        component: UpdateTeacher,
        title: configTitles.title.updateTeacher,
    },
    {
        path: configRoutes.routes.updateStudent,
        component: UpdateStudent,
        title: configTitles.title.updateStudent,
    },
    {
        path: configRoutes.routes.updateSubject,
        component: UpdateSubject,
        title: configTitles.title.updateSubject,
    },
    {
        path: configRoutes.routes.updateClass,
        component: UpdateClass,
        title: configTitles.title.updateClass,
    },
];
