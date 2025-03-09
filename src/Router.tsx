import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { BusinessPage } from './pages/Business/Business.page';
import { JSX } from 'react';
import { LoginPage } from './pages/Authentication/Login.page';
import { AllBusinessPage } from './pages/Business/AllBusiness.page';
import { Reservations } from './pages/Reservations/Reservations.page';
import ReservationPage from './pages/Reservations/Reservation.page';
import ConfirmReservation from './pages/Reservations/ConfirmReservation';
import ReservationSuccess from './pages/Reservations/ReservationSuccess';

const navigateToPageIfAuthenticated = (component: JSX.Element) => {


  return component;
  // return isAuthenticated() ? component : <LoginPage />;
}

//ConfirmReservation

const router = createBrowserRouter([
  {
    path: '/',
    element: navigateToPageIfAuthenticated(<HomePage />),
  },
  {
    path: '/:businessName',
    element: <ReservationPage />,
  },
  {
    path: '/:businessName/Confirm',
    element: <ConfirmReservation />,
  },
  {
    path: '/:businessName/success/:id',
    element: <ReservationSuccess />,
  },
  {
    path: '/Business/:id',
    element: navigateToPageIfAuthenticated(<BusinessPage />),
  },
  {
    path: '/:id/Reservations',
    element: navigateToPageIfAuthenticated(<Reservations />),
  },
  {
    path: '/AllBusiness',
    element: navigateToPageIfAuthenticated(<AllBusinessPage />),
  },
  {
    path: '/Login',
    element: <LoginPage />,
  },
]);






export function Router() {
  
  return <RouterProvider router={router} />;
}
