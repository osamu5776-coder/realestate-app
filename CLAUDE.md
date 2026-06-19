# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Supabase認証機能付きの不動産管理Webアプリ。メールアドレス＋パスワード認証で会員登録・ログインができ、ログイン後に物件一覧画面を表示する。

**技術スタック:** React 18 + Vite 6 + Supabase + React Router v6

## Commands

```bash
npm run dev      # 開発サーバー起動（http://localhost:5173）
npm run build    # プロダクションビルド（dist/に出力）
npm run preview  # ビルド結果のプレビュー
npm run lint     # ESLintによるコード検査
```

## Architecture

### ルーティング構造

```
/           → /login へリダイレクト
/login      → ログイン画面（認証済みなら /properties へ）
/register   → 会員登録画面（認証済みなら /properties へ）
/properties → 物件一覧画面（未認証なら /login へリダイレクト）
```

### 認証フロー

`AuthContext`（[src/contexts/AuthContext.jsx](src/contexts/AuthContext.jsx)）でSupabaseのセッションを管理し、アプリ全体にユーザー状態を提供する。`supabase.auth.onAuthStateChange` でリアルタイムに認証状態変化を監視。

`AuthGuard`（[src/components/AuthGuard.jsx](src/components/AuthGuard.jsx)）が保護ルートをラップし、未認証ユーザーを `/login` にリダイレクトする。

### ファイル構成

```
src/
├── supabase.js              # Supabaseクライアント（環境変数から初期化）
├── contexts/
│   └── AuthContext.jsx      # 認証状態のグローバル管理
├── components/
│   ├── AuthGuard.jsx        # 保護ルートコンポーネント
│   └── PropertyCard.jsx     # 物件カード表示コンポーネント
└── pages/
    ├── Login.jsx            # ログインフォーム
    ├── Register.jsx         # 会員登録フォーム
    └── Properties.jsx       # 物件一覧（ダミーデータ表示）
```

## Environment Variables

`.env` ファイルに以下を設定（`.gitignore` により Git 管理外）。`.env.example` を参考にすること。

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Git Rules

**コードを変更するたびに必ず GitHub にプッシュすること。**

```bash
git add <変更ファイル>
git commit -m "変更内容の説明"
git push
```

`.env` は絶対にコミットしない。`.env.example` はコミット対象。
