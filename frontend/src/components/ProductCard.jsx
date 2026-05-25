import { formatCurrency } from '../lib/format'

function ProductCard({ product, categoryName }) {
  return (
    <article className="product-card reveal-item">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="product-badge">{product.badge}</span>
      </div>

      <div className="product-content">
        <span className="product-category">{categoryName}</span>
        <h3>{product.name}</h3>
        <p>{formatCurrency(product.price)}</p>
        <small>Stock disponible: {product.stock}</small>
      </div>
    </article>
  )
}

export default ProductCard
