import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../contexts/AuthContext'
import PropertyCard from '../components/PropertyCard'

// ダミーの物件データ
const DUMMY_PROPERTIES = [
  { id: 1, name: '渋谷ヒルズマンション 301号室', rent: 150000, area: '東京都渋谷区' },
  { id: 2, name: 'シーサイドアパート 105号室', rent: 80000, area: '神奈川県横浜市西区' },
  { id: 3, name: '新宿ガーデンタワー 1502号室', rent: 220000, area: '東京都新宿区' },
  { id: 4, name: '梅田コンドミニアム 202号室', rent: 120000, area: '大阪府大阪市北区' },
  { id: 5, name: '港区プレミアムレジデンス 801号室', rent: 350000, area: '東京都港区' },
  { id: 6, name: '心斎橋スタイルアパート 301号室', rent: 95000, area: '大阪府大阪市中央区' },
  { id: 7, name: '名古屋栄レジデンス 401号室', rent: 75000, area: '愛知県名古屋市中区' },
  { id: 8, name: '福岡天神マンション 601号室', rent: 90000, area: '福岡県福岡市中央区' },
]

const Properties = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // ログアウト処理
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button className="logout-button" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      </header>
      <main className="properties-grid">
        {DUMMY_PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </main>
    </div>
  )
}

export default Properties
