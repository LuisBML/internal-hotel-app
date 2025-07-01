// import styled from 'styled-components';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyles from './styles/GlobalStyles';

import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';
import AppLayout from './ui/AppLayout';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Styled Components: take a regular HTML element and then using the
// styled function create a brand new React component
// with some CSS styles applied to it. It's possible reuse that new component

// Styled Components work similar to an HTML element, e.g. we can use the onClick property.
// const StyledApp = styled.main`
//   background-color: gray;
//   padding: 20px;
// `;

// QueryClient sets up the cache behind the scenes
const queryClient = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
      {/* provide Query data to the entire application tree */}
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        {/* Global CSS */}
        <GlobalStyles />

        <BrowserRouter>
          <Routes>
            {/* Layout route because it doesn't have the path prop */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* index: to indicate default route/element */}
              {/* <Navigate />: to redirect to /dashboard (the Route below this Route). Use 'replace' keyword to replace the current element in the history stack(enable back action or previous page in the web browser)*/}
              <Route index element={<Navigate replace to='dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='bookings' element={<Bookings />} />
              <Route path='bookings/:bookingId' element={<Booking />} />
              <Route path='checkin/:bookingId' element={<Checkin />} />
              <Route path='cabins' element={<Cabins />} />
              <Route path='users' element={<Users />} />
              <Route path='settings' element={<Settings />} />
              <Route path='account' element={<Account />} />
            </Route>

            <Route path='login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 2000 },
            error: { duration: 4000 },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
