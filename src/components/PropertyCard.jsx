// 物件情報を表示するカードコンポーネント
// 編集・削除ボタンは親コンポーネントのハンドラを呼び出す
const PropertyCard = ({ property, onEdit, onDelete }) => {
  const formattedRent = property.rent.toLocaleString('ja-JP')

  return (
    <div className="property-card">
      <h3 className="property-name">{property.name}</h3>
      <div className="property-info">
        <p className="property-floor-plan">🏠 {property.floor_plan}</p>
        <p className="property-area">📍 {property.area}</p>
        <p className="property-rent">¥{formattedRent} / 月</p>
      </div>
      <div className="property-actions">
        <button className="btn-edit" onClick={() => onEdit(property)}>
          編集
        </button>
        <button className="btn-delete" onClick={() => onDelete(property)}>
          削除
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
