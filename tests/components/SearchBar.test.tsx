import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/src/components/ui/SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();
  
  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search for a city...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search for a city...');
    fireEvent.change(input, { target: { value: 'London' } });
    
    expect(input).toHaveValue('London');
  });

  it('calls onSearch when form is submitted', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search for a city...');
    fireEvent.change(input, { target: { value: 'London' } });
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    expect(mockOnSearch).toHaveBeenCalledWith('London');
  });

  it('does not call onSearch when input is empty', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});