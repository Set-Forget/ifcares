import { useContext } from 'react';
import useAuth from '../../../hooks/useAuth';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';

export default function Header() {
  const { resetAllStates } = useContext(MealSiteContext);

  const { auth, setAuth } = useAuth();
  const { name, lastname, email } = auth;

  const handleLogout = () => {
    resetAllStates()
    localStorage.removeItem('user');
    setAuth({});
  };

  return (
    <header className="fixed md:relative z-10 bottom-0 w-full h-24 md:h-14 bg-[#5D24FF] shadow text-white flex items-center justify-between md:justify-end px-4 md:px-40">
      <div className="text-xl md:text-xs text-left md:text-right">
        <p>{`${name} ${lastname}`}</p>
        <p>{email}</p>
      </div>
      <div
        className="ml-8 flex mr-2 text-2xl md:text-base hover:text-slate-400 hover:cursor-pointer"
        onClick={handleLogout}
      >
        Logout
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mt-[6px] ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </div>
    </header>
  );
}
