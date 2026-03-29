import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import App from '../App';

const renderWithProviders = (user = null) => {
  const authValue = {
    user,
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: !!user,
  };

  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

test('renders public navigation links when logged out', () => {
  const { getByRole } = renderWithProviders(null);
  expect(getByRole('link', { name: /login/i })).toBeInTheDocument();
  expect(getByRole('link', { name: /register/i })).toBeInTheDocument();
});
