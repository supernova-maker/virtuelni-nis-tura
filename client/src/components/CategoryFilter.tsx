import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div>
      <label>
        <input
          type="radio"
          value=""
          checked={selectedCategory === null}
          onChange={() => onCategoryChange(null)}
        />
        Sve
      </label>
      {categories.map(category => (
        <label key={category}>
          <input
            type="radio"
            value={category}
            checked={selectedCategory === category}
            onChange={() => onCategoryChange(category)}
          />
          {category}
        </label>
      ))}
    </div>
  );
}

export default CategoryFilter;