package camt.cbsd.config;

import camt.cbsd.dao.CourseDao;
import camt.cbsd.dao.ProductDao;
import camt.cbsd.dao.StudentDao;
import camt.cbsd.entity.Course;
import camt.cbsd.entity.Product;
import camt.cbsd.entity.Student;
import camt.cbsd.entity.security.Authority;
import camt.cbsd.entity.security.AuthorityName;
import camt.cbsd.entity.security.User;
import camt.cbsd.repository.StudentRepository;
import camt.cbsd.security.repository.AuthorityRepository;
import camt.cbsd.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.beans.Transient;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by Dto on 07-Apr-17.
 */
@ConfigurationProperties(prefix="server")
@Component
public class DataLoader implements ApplicationRunner{
    User user1,user2,user3;



    ProductDao productDao;
    @Autowired
    public void setProductDao(ProductDao productDao) {
        this.productDao = productDao;
    }
    StudentDao studentDao;
    @Autowired
    public void setStudentDao(StudentDao studentDao) {
        this.studentDao = studentDao;
    }

    CourseDao courseDao;
    @Autowired
    public void setCourseDao(CourseDao courseDao) {
        this.courseDao = courseDao;
    }

    String baseUrl;
    String imageUrl;
    String imageBaseUrl;
    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    UserRepository userSecurityRepository;
    @Autowired
    public void setUserSecurityRepository(UserRepository userSecurityRepository) {
        this.userSecurityRepository = userSecurityRepository;
    }
    AuthorityRepository authorityRepository;

    @Autowired
    public void setAuthorityRepository(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        imageBaseUrl = baseUrl + imageUrl;
        Student student1 = Student.builder().studentId("SE-001").name("Mitsuha").surname("Miyamizu")
                .gpa(20).image("Bangkok").feature("pending")
                .penAmount("12.12.2017").description("Paypal").build();
        Student student2 = Student.builder().studentId("SE-002").name("Prayuth").surname("The minister")
                .gpa(15).image("Chiang Mai").feature("paid")
                .penAmount("11.12.2017").description("Bank Transfer").build();
        Student student3 = Student.builder().studentId("SE-003").name("Jurgen").surname("Kloop")
                .gpa(10).image("Kon Kaen").feature("paid")
                .penAmount("10.12.2017").description("Credit").build();

        Product product1 = Product.builder().productId("1").productName("mario1").productPrice(12.0).productQuantity(10)
                .image(imageBaseUrl+"a.jpg").description("good shirt").size("M").color("Red").build();
        Product product2 =  Product.builder().productId("2").productName("mario2").productPrice(12.0).productQuantity(10)
                .image(imageBaseUrl+"b.jpg").description("good shirt").size("M").color("Red").build();
        Product product3 =  Product.builder().productId("3").productName("mario3").productPrice(12.0).productQuantity(10)
                .image(imageBaseUrl+"c.jpg").description("good shirt").size("M").color("Red").build();
        Product product4 =  Product.builder().productId("4").productName("mario4").productPrice(12.0).productQuantity(10)
                .image(imageBaseUrl+"d.jpg").description("good shirt").size("M").color("Red").build();

        productDao.add(product1);
        productDao.add(product2);
        productDao.add(product3);
        productDao.add(product4);

        Course course1 = Course.builder().courseId("953331").courseName("CBSD").build();
        Course course2 = Course.builder().courseId("953323").courseName("Software Construction").build();
        Course course3 = Course.builder().courseId("953499").courseName("Software Project").build();

        courseDao.add(course1);
        courseDao.add(course2);
        courseDao.add(course3);
        studentDao.addStudent(student1);
        studentDao.addStudent(student2);
        studentDao.addStudent(student3);

        student1.addCourse(course1);
        student1.addCourse(course2);
        student2.addCourse(course2);
        student2.addCourse(course3);
        student3.addCourse(course1);
        student3.addCourse(course3);

        securitySetup();
        student1.setUser(user1);
        user1.setStudent(student1);
        student2.setUser(user2);
        user2.setStudent(student2);
        student3.setUser(user3);
        user3.setStudent(student3);


    }
    private void securitySetup() {
         user1 = User.builder()
                .username("admin")
                .password("admin")
                .firstname("admin")
                .lastname("admin")
                .email("admin@admin.com")
                .enabled(true)
                .lastPasswordResetDate(Date.from(LocalDate.of(2016, 01, 01).atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .build();

         user2 = User.builder()
                .username("seller")
                .password("seller")
                .firstname("seller")
                .lastname("seller")
                .email("seller@gmail.com")
                .enabled(true)
                .lastPasswordResetDate(Date.from(LocalDate.of(2016, 01, 01).atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .build();
         user3 = User.builder()
                .username("user")
                .password("user")
                .firstname("user")
                .lastname("user")
                .email("user@gmail.com")
                .enabled(true)
                .lastPasswordResetDate(Date.from(LocalDate.of(2016, 01, 01).atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .build();

        Authority auth1 = Authority.builder().name(AuthorityName.ROLE_ADMIN).build();
        Authority auth2 = Authority.builder().name(AuthorityName.ROLE_SELLER).build();
        Authority auth3 = Authority.builder().name(AuthorityName.ROLE_USER).build();
        authorityRepository.save(auth1);
        authorityRepository.save(auth2);
        authorityRepository.save(auth3);
        user1.setAuthorities(new ArrayList<>());
        user1.getAuthorities().add(auth1);
        user2.setAuthorities(new ArrayList<>());
        user2.getAuthorities().add(auth2);
        user3.setAuthorities(new ArrayList<>());
        user3.getAuthorities().add(auth3);

        user1.setPassword(new BCryptPasswordEncoder().encode(user1.getPassword()));
        user2.setPassword(new BCryptPasswordEncoder().encode(user2.getPassword()));
        user3.setPassword(new BCryptPasswordEncoder().encode(user3.getPassword()));


        userSecurityRepository.save(user1);

        userSecurityRepository.save(user2);
        userSecurityRepository.save(user3);
    }
}
