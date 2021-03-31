class Student
{
    constructor(name,rollno)
    {
        this.name=name;
        this.rollno=rollno;

    }

    printData()
    {
        console.log("Name :"+this.name);
        console.log("Roll No :"+this.rollno);
    }
}


module.exports = Student;