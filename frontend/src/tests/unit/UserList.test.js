import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserList from '../../components/UserList';

describe('UserList Unit Tests', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  const mockOnUserDeleted = jest.fn();

  beforeEach(() => {
    mockOnUserDeleted.mockClear();
  });

  test('renders users list', () => {
    render(<UserList users={mockUsers} onUserDeleted={mockOnUserDeleted} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
  });

  test('renders empty state when no users', () => {
    render(<UserList users={[]} onUserDeleted={mockOnUserDeleted} />);
    
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  test('calls onUserDeleted when delete button clicked', () => {
    render(<UserList users={mockUsers} onUserDeleted={mockOnUserDeleted} />);
    
    const deleteButton = screen.getByTestId('delete-user-1');
    fireEvent.click(deleteButton);
    
    expect(mockOnUserDeleted).toHaveBeenCalledWith(1);
  });
});