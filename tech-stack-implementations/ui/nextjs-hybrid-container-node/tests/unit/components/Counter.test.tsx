// App: app-factory
// File: tests/unit/components/Counter.test.tsx
// Version: 1.0.0
// Turns: 13
// Author: AI Coding Agent (Claude Opus 4.5)
// Date: 2026-03-29T00:26:14Z
// Description: Unit tests for Counter component

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from '@/components/ui/Counter';

describe('Counter', () => {
  it('renders with initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments count when + button is clicked', () => {
    render(<Counter />);

    const incrementButton = screen.getByRole('button', { name: /increase count/i });
    fireEvent.click(incrementButton);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('decrements count when - button is clicked', () => {
    render(<Counter />);

    const decrementButton = screen.getByRole('button', { name: /decrease count/i });
    fireEvent.click(decrementButton);

    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('resets count when reset button is clicked', () => {
    render(<Counter />);

    // Increment a few times
    const incrementButton = screen.getByRole('button', { name: /increase count/i });
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(screen.getByText('3')).toBeInTheDocument();

    // Reset
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles multiple increments and decrements', () => {
    render(<Counter />);

    const incrementButton = screen.getByRole('button', { name: /increase count/i });
    const decrementButton = screen.getByRole('button', { name: /decrease count/i });

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
