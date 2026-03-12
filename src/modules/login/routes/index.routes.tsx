import { RouteObject } from 'react-router-dom';
import { LoginPage } from '../pages';
import { RegisterPage } from '../pages/register';
import { ForgotPasswordPage } from '../pages/forgotPassword';
import { ResetPasswordPage } from '../pages/resetPassword';

const loginRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
];

export { loginRoutes };
