'use client'


import './Home.css';
import StudentsTable from '../../components/studentsTable/StudentsTable';

const Home = () => {
  return (
    <div className="body">
      <StudentsTable />
    </div>
  );
};

export default Home;
