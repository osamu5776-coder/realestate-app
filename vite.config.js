import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 環境変数はVITE_プレフィックスが必要（ビルド時に埋め込まれる）
})
