import * as React from 'react';

/**
 * A custom hook that debounces a value by delaying updates until after a specified delay.
 * @param value The value to debounce
 * @param delay The delay in milliseconds (default: 500ms)
 * @returns The debounced value
 * @example
 * const [searchTerm, setSearchTerm] = React.useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 300)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    // Create a timeout to update the debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if the value changes or the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Only re-run if value or delay changes

  return debouncedValue;
}
