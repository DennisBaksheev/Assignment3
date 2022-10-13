const fs = require('fs')
var students = []
var programs = []

exports.initialize = () => {
    return new Promise ((resolve, reject) => {
        file.readFile('./data/students.json', (err,data) => {
            if (err) {
                reject ('unable to read file');
            }
            else {
                students = JSON.parse(data);
            }
        });

        file.readFile('./data/programs.json', (err,data)=> {
            if (err) {
                reject ('unable to read file');
            }
            else {
                programs = JSON.parse(data);
            }
        })
        resolve();
    })
};




exports.getAllStudents = () => {
    return new Promise ((resolve,reject) => {
        if (students.length == 0) {
            reject('no results returned');
        }
        else {
            resolve(students);
        }
    })
};

exports.getInternationalStudents = () => {
    return new Promise((resolve, reject) => {
        var interStudents = students.filter(student => student.isInternationalStudents == true);
        if (interStudents.length == 0) {
            reject('no results returned');
        }
        resolve(interStudents);
    })
};
exports.getPrograms = () => {
    return new Promise((resolve,reject) => {
        if (programs.length == 0) {
            reject ('no results returned');
        }
        else {
            resolve (programs);
        }
    })
};

exports.addStudent = (studentData) => {
    studentData.isInternationalStudent==undefined ? studentData.isInternationalStudent = false : studentData.isInternationalStudent = true;
    studentData.studentNum = students.length + 1;
    students.push(studentData);

    return new Promise((resolve,reject) => {
        if (students.length == 0) {
            reject ('no results');
        }
        else {
            resolve(students);
        }
    })
};



	exports.getStudentByStatus = (status) => {
		return new Promise((resolve,reject) => {
			var stu_status = students.filter(student => student.status == status);
			if (stu_status.length == 0) {
				reject('no results returned');
			}
			resolve(stu_status);
		})
	};

	exports.getStudentsByProgramCode = (programCode) => {
		return new Promise ((resolve,reject) => {
			var stu_programCode = students.filter(student => student.programCode == programCode);        
			if (stu_programCode.length == 0) {
				reject ('no results returned');
			}
			resolve(stu_programCode);
		})
	};


	exports.getStudentsByExpectedCredential = (credential) => {
		return new Promise ((resolve,reject) => {
			var stu_credential = students.filter(student => student.studentcredentialNum == credential);
			if (stu_credential.length == 0) {
				reject('no results returned');
			}
			resolve(stu_credential);
		})
	};
	
	exports.getStudentById = (sid) => {
		return new Promise((resolve,reject) => {
			var stu_sid = students.filter(student => student.studentsid == sid);
			if (stu_sid.length == 0) {
				reject('no result returned');
			}
			resolve(stu_sid);
		})
	}






const getInternationalStudents = () =>
	new Promise((resolve, reject) => {
		const interStudents = students.filter((s) => s.isInternationalStudent === true)
		if (!interStudents || interStudents.length === 0) reject('no results returned')
		resolve(interStudents)
	})

const getPrograms = () =>
	new Promise((resolve, reject) => {
		if (!programs || programs.length === 0) reject('no results returned')
		resolve(programs)
	})

