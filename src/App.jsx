import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AuthGuard from './components/AuthGuard'
import Login from './pages/Login'
import Register from './pages/Register'
import Properties from './pages/Properties'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ルートは常にログイン画面へリダイレクト */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* 物件一覧は認証済みユーザーのみアクセス可能 */}
          <Route
            path="/properties"
            element={
              <AuthGuard>
                <Properties />
              </AuthGuard>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
