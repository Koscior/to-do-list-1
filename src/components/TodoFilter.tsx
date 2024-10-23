import React from 'react';
import { FilterType } from '../types';

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function TodoFilter({ filter, onFilterChange, counts }: TodoFilterProps) {
  const filters: { value: FilterType; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'active', label: 'Active', count: counts.active },
    { value: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map(({ value, label, count }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-current={filter === value ? 'page' : undefined}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
}