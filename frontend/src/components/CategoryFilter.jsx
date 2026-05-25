function CategoryFilter({ categories, selectedCategory, onChangeCategory }) {
  return (
    <div className="filter-wrap reveal-item">
      <p>Filtrar por categoria</p>
      <div className="filter-list">
        <button
          type="button"
          className={`chip${selectedCategory === 'all' ? ' chip-active' : ''}`}
          onClick={() => onChangeCategory('all')}
        >
          Todas
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`chip${selectedCategory === category.id ? ' chip-active' : ''}`}
            onClick={() => onChangeCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
