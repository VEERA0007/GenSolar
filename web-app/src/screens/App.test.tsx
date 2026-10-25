import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('GenSolar entry flow', () => {
  it('shows welcome and navigates to login', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /clean energy/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /^login/i }));
    expect(screen.getByRole('heading', { name: /login to gensolar/i })).toBeTruthy();
  });
  it('allows selecting a role and opening the estimator', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^login/i }));
    fireEvent.change(screen.getByLabelText(/mobile number/i), { target: { value: 'demo@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.click(screen.getByRole('button', { name: /sales manager/i }));
    expect(screen.getByRole('button', { name: /sales manager/i }).getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: /^next/i }));
    expect(screen.getByRole('heading', { name: /what will solar cost/i })).toBeTruthy();
  });
});
