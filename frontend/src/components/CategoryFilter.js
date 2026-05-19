// Composant de filtrage par catégorie
import React from 'react';
const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="category-filter">
      <h4>Filtrer par catégorie</h4>
      <div className="categories">
        {categories.map(cat => (
          <button 
            key={cat}
            className={selected === cat ? 'active' : ''}
            onClick={() => onSelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
export default CategoryFilter;
