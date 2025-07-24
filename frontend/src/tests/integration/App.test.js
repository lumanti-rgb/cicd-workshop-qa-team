import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';
import { userService } from '../../services/userService';

jest.mock('../../services/userService');

describe('App Integration Tests', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  beforeEach(() => {
    userService.getUsers.mockResolvedValue(mockUsers);
    userService.createUser.mockResolvedValue({ id: 3, name: 'New User', email: 'new@example.com' });
    userService.deleteUser.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('loads and displays users on mount', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
    
    expect(userService.getUsers).toHaveBeenCalledTimes(1);
  });

  test('displays loading state initially', () => {
    render(<App />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles error state', async () => {
    userService.getUsers.mockRejectedValue(new Error('API Error'));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load users')).toBeInTheDocument();
    });
  });
});