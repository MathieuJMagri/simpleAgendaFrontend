const About = () => {
  return (
    <div>
      <h1>
        McGill University ECSE 428 Fall 2021 Team 7
      </h1>
      <h2>
        {" "}
        Credits: 
        <ul>
          <li>● Charles Liu</li>
          <li>● Edwin Pan</li>
          <li>● Ezra Gomolin</li>
          <li>● Francis Comeau</li>
          <li>● Jeffery Tang</li>
          <li>● Liang Zhao</li>
          <li>● Mathieu-Joseph Magri</li>
          <li>● Talha Riaz</li>
          <li>● Yujie Qin</li>
          <li>● Amine Mallek</li>
        </ul>
      </h2>
      <p>
        This app was developed by a team of 10 students in the Electrical and
        Computer Engineering Department at McGill University. It is part of a
        group project for the ECSE 428 Software Engineering Practice course. The
        app designed to help students with their organization strategy in
        academics featuring adding, editing, and deletion of courses and tasks 
        and a login system tailouring these lists to each student. The app is 
        developed in javascript with a reactjs frontend and an expressjs backend
        with the code split respectively into two github repositories with GitHub
        actions for CI with automated testing and deployment of its release
        branch. For the students who developed this project, this project serves
        as an exercise of SCRUM practices with three 3-week sprints over the
        course of a Fall Semester.
      </p>
    </div>
  );
};

export default About;
