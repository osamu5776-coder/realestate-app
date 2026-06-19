import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 環境変数が未設定の場合はエラー画面を表示してアプリのクラッシュを防ぐ
if (!supabaseUrl || !supabaseAnonKey) {
  createRoot(document.getElementById('root')).render(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      gap: '1rem',
      color: '#333',
      padding: '2rem',
      textAlign: 'center',
      background: '#f7fafc',
    }}>
      <h2 style={{ color: '#c53030' }}>環境変数が設定されていません</h2>
      <p>Vercel ダッシュボード → プロジェクト → Settings → Environment Variables に以下を追加して再デプロイしてください。</p>
      <pre style={{
        background: '#1a365d',
        color: '#fff',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        textAlign: 'left',
        lineHeight: '2',
      }}>
        {`VITE_SUPABASE_URL\nVITE_SUPABASE_ANON_KEY`}
      </pre>
    </div>
  )
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
