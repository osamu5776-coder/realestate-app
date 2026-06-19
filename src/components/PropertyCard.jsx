// 物件情報を表示するカードコンポーネント
const PropertyCard = ({ property }) => {
  const formattedRent = property.rent.toLocaleString('ja-JP')

  return (
    <div className="property-card">
      <h3 className="property-name">{property.name}</h3>
      <div className="property-info">
        <p className="property-area">📍 {property.area}</p>
        <p className="property-rent">¥{formattedRent} / 月</p>
      </div>
    </div>
  )
}

export default PropertyCard
