import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../contexts/AuthContext'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'

const Properties = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState('')
  // showModal: false | 'add' | 'edit'
  const [showModal, setShowModal] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)

  // 自分が登録した物件一覧をSupabaseから取得（新着順）
  // RLSポリシーにより他ユーザーのデータは自動的にフィルタされる
  const fetchProperties = useCallback(async () => {
    setLoadingData(true)
    setError('')
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('物件データの取得に失敗しました: ' + error.message)
    } else {
      setProperties(data)
    }
    setLoadingData(false)
  }, [])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  // ログアウト
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  // 物件の新規登録（INSERT）
  const handleAdd = async (formData) => {
    setFormLoading(true)
    setError('')
    const { error } = await supabase.from('properties').insert({
      ...formData,
      user_id: user.id,
    })
    if (error) {
      setError('物件の登録に失敗しました: ' + error.message)
    } else {
      setShowModal(false)
      fetchProperties()
    }
    setFormLoading(false)
  }

  // 物件の更新（UPDATE）
  const handleUpdate = async (formData) => {
    setFormLoading(true)
    setError('')
    const { error } = await supabase
      .from('properties')
      .update(formData)
      .eq('id', editingProperty.id)

    if (error) {
      setError('物件の更新に失敗しました: ' + error.message)
    } else {
      setShowModal(false)
      setEditingProperty(null)
      fetchProperties()
    }
    setFormLoading(false)
  }

  // 物件の削除（DELETE）：確認ダイアログを表示してから実行
  const handleDelete = async (property) => {
    if (!window.confirm(`「${property.name}」を削除してよろしいですか？`)) return

    setError('')
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', property.id)

    if (error) {
      setError('物件の削除に失敗しました: ' + error.message)
    } else {
      fetchProperties()
    }
  }

  // 編集ボタン押下：対象物件をセットしてモーダルを開く
  const handleEdit = (property) => {
    setEditingProperty(property)
    setShowModal('edit')
  }

  // モーダルを閉じる
  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProperty(null)
  }

  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button className="btn-add" onClick={() => setShowModal('add')}>
            + 新規登録
          </button>
          <button className="logout-button" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      </header>

      <main className="properties-main">
        {error && <p className="error-message error-top">{error}</p>}

        {loadingData ? (
          <p className="loading">読み込み中...</p>
        ) : properties.length === 0 ? (
          <div className="empty-state">
            <p>登録されている物件はありません。</p>
            <button className="btn-add" onClick={() => setShowModal('add')}>
              最初の物件を登録する
            </button>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* 新規登録・編集モーダル（オーバーレイ外クリックで閉じる） */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {showModal === 'edit' ? '物件を編集' : '物件を新規登録'}
            </h2>
            <PropertyForm
              property={showModal === 'edit' ? editingProperty : null}
              onSubmit={showModal === 'edit' ? handleUpdate : handleAdd}
              onCancel={handleCloseModal}
              loading={formLoading}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Properties
