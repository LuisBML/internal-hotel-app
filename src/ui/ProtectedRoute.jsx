import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPageContainer = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoadingUser, isAuthenticated } = useUser();

  // 2. If there is no authenticated user, redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoadingUser, navigate]);

  // 3. While loading return a spinner
  if (isLoadingUser)
    return (
      <FullPageContainer>
        <Spinner />
      </FullPageContainer>
    );

  // 4. If there is a user render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
