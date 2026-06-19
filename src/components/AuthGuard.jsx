// 未認証ユーザーをログイン画面にリダイレクトする保護コンポーネント
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return <div className="loading">読み込み中...</div>
  if (!user) return <Navigate to="/login" replace />

  return children
}

export default AuthGuard
