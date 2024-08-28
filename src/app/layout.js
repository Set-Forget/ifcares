'use client'
 
import { usePathname, useRouter } from 'next/navigation'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../context/AuthProvider'
import { MealSiteProvider } from '@/components/mealSiteProvider/MealSiteProvider'
import Header from '../components/header/Header'
import { If, Then } from 'react-if'
import { useEffect } from 'react'



const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter();

  useEffect(() => {
    const checkSessionExpiration = () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (user && user.expirationTime) {
        const currentTime = new Date().getTime();
        if (currentTime > user.expirationTime) {
          localStorage.removeItem('user');
          // You can also clear your authentication state here
          router.push('/auth/login'); // Redirect to login page
        }
      }
    };

    // Set interval to check every 10 minutes (600,000 milliseconds)
    const interval = setInterval(() => {
      checkSessionExpiration();
    }, 600000); // 600,000 milliseconds = 10 minutes

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [router]);
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <AuthProvider>
        <MealSiteProvider>
          <body className={inter.className} suppressHydrationWarning={true}>
            <If condition={!pathname.includes("login")}>
              <Then>
                <Header/>
              </Then>
            </If>
              {children}
          </body>
        </MealSiteProvider>
      </AuthProvider>
    </html>
  )
}
