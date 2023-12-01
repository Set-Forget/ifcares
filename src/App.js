import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';

import RequireAuth from './components/auth/RequireAuth';

import Home from './components/pages/home/Home';
import Form from './components/pages/form/Form';
import MealCount from './components/pages/mealCount/MealCount';
import Login from './components/pages/login/Login';

import { ROLES } from './constants';
import { MealSiteProvider } from './components/common/mealSiteProvider/MealSiteProvider';
import Welcome from './components/pages/welcome/Welcome';

function App() {
  return (
    <div className="App">
    <Router basename="/">
      <AuthProvider>
      <MealSiteProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
            <Route exact path='/home' element={<Home />} />
            <Route path="/addStudent" element={<Form />} />
            <Route path="/mealCount" element={<MealCount />} />
            <Route path="/welcome" element={<Welcome />} />
          </Route>
        </Routes>
        </MealSiteProvider>
      </AuthProvider>
    </Router>
  </div>
  );
}

export default App;
