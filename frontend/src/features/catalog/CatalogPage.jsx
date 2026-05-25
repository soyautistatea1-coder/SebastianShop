import { useMemo, useState } from 'react'
import AnimatedSection from '../../components/AnimatedSection'
import CategoryFilter from '../../components/CategoryFilter'
import ProductCard from '../../components/ProductCard'
import { normalizeText } from '../../lib/format'

function CatalogPage({ products, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [query, setQuery] = useState('')

  const categoryById = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category])),
    [categories],
  )

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.categoryId === selectedCategory

      const normalizedQuery = normalizeText(query)
      const matchesQuery =
        !normalizedQuery || normalizeText(product.name).includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [products, selectedCategory, query])

  return (
    <AnimatedSection className="catalog-page">
      <header className="catalog-head reveal-item">
        <h2>Catalogo tienda sebastian</h2>
        <p>Explora productos generales y filtra por categoria.</p>
      </header>

      <div className="search-wrap reveal-item">
        <input
          type="search"
          placeholder="Buscar producto por nombre"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChangeCategory={setSelectedCategory}
      />

      <section className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categoryName={categoryById[product.categoryId]?.name || 'Sin categoria'}
          />
        ))}
      </section>

      {filteredProducts.length === 0 ? (
        <p className="reveal-item">No hay productos que coincidan con tu filtro.</p>
      ) : null}
    </AnimatedSection>
  )
}

export default CatalogPage
