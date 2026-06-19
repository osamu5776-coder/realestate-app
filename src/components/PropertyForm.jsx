import { useState, useEffect } from 'react'

// 物件の新規登録・編集に使う共通フォームコンポーネント
// property が null なら新規登録、値があれば編集モード
const PropertyForm = ({ property, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    rent: '',
    area: '',
    floor_plan: '',
  })

  useEffect(() => {
    // 編集モードの場合は既存データをフォームに設定
    if (property) {
      setFormData({
        name: property.name,
        rent: property.rent,
        area: property.area,
        floor_plan: property.floor_plan,
      })
    }
  }, [property])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // rentは数値に変換してから送信
    onSubmit({ ...formData, rent: parseInt(formData.rent, 10) })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>物件名</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="例：渋谷ヒルズマンション 301号室"
          required
        />
      </div>
      <div className="form-group">
        <label>家賃（円）</label>
        <input
          type="number"
          name="rent"
          value={formData.rent}
          onChange={handleChange}
          placeholder="例：150000"
          min="1"
          required
        />
      </div>
      <div className="form-group">
        <label>エリア名</label>
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="例：東京都渋谷区"
          required
        />
      </div>
      <div className="form-group">
        <label>間取り</label>
        <input
          type="text"
          name="floor_plan"
          value={formData.floor_plan}
          onChange={handleChange}
          placeholder="例：1LDK"
          required
        />
      </div>
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          キャンセル
        </button>
        <button type="submit" disabled={loading}>
          {loading ? '保存中...' : property ? '更新する' : '登録する'}
        </button>
      </div>
    </form>
  )
}

export default PropertyForm
