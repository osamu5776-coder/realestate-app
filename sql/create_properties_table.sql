-- =============================================
-- 不動産管理アプリ：propertiesテーブル作成SQL
-- Supabaseダッシュボード > SQL Editor で実行してください
-- =============================================

-- propertiesテーブルを作成
CREATE TABLE properties (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,                        -- 物件名
  rent        INTEGER     NOT NULL CHECK (rent > 0),       -- 家賃（円）
  area        TEXT        NOT NULL,                        -- エリア名
  floor_plan  TEXT        NOT NULL,                        -- 間取り（例：1LDK）
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- 登録ユーザー
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL           -- 登録日時
);

-- user_idに検索インデックスを追加（RLSフィルタのパフォーマンス向上）
CREATE INDEX idx_properties_user_id ON properties(user_id);

-- Row Level Security (RLS) を有効化
-- これにより、ポリシーで明示的に許可されない限りアクセス不可になる
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- ポリシー①：自分が登録した物件のみ参照できる
CREATE POLICY "ユーザーは自分の物件のみ参照できる"
  ON properties
  FOR SELECT
  USING (auth.uid() = user_id);

-- ポリシー②：user_idが自分のIDと一致する場合のみ挿入できる
CREATE POLICY "ユーザーは自分の物件のみ挿入できる"
  ON properties
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ポリシー③：自分が登録した物件のみ更新できる
CREATE POLICY "ユーザーは自分の物件のみ更新できる"
  ON properties
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ポリシー④：自分が登録した物件のみ削除できる
CREATE POLICY "ユーザーは自分の物件のみ削除できる"
  ON properties
  FOR DELETE
  USING (auth.uid() = user_id);
