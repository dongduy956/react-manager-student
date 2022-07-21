export const contains={
    updateClass: '/update-class/',
    updatePoint: '/update-point/',
    updateStudent: '/update-student/',
    updateTeacher: '/update-teacher/',
    updateSubject: '/update-subject/',
}
export const routes = {
    point: '/',
    student: '/student',
    teacher: '/teacher',
    class: '/class',
    subject: '/subject',
    addClass: '/add-class',
    addPoint: '/add-point',
    addStudent: '/add-student',
    addTeacher: '/add-teacher',
    addSubject: '/add-subject',
    updateClass: `${contains.updateClass}:alias`,
    updatePoint: `${contains.updatePoint}:alias`,
    updateStudent: `${contains.updateStudent}:alias`,
    updateTeacher: `${contains.updateTeacher}:alias`,
    updateSubject: `${contains.updateSubject}:alias`,
};
