package camt.cbsd.dao;

import camt.cbsd.entity.Student;

import java.util.List;

/**
 * Created by Dto on 3/15/2017.
 */
public interface StudentDao {
    List<Student> getStudents();
    Student findById(long id);
    Student addStudent(Student student);
    Integer size();
    Student findByUsername(String username);
    List<Student>getStudents(String searchText);

    List<Student> findByStatue(String query);

    List<Student> findByDate(String query);
}
