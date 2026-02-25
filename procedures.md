# 経理業務 手順書

## 概要

本手順書では、sento.group の経理業務フローを「メンバーが行う作業」と「経理担当者が行う作業」に分けて説明します。

---

## 1. メンバーが行う作業

### 1-1. 請求書の提出（毎月）

毎月の稼働に対する請求書を提出します。

1. **請求書申請アプリ**を開く
   - https://script.google.com/u/0/home/projects/1fClzT9rZdZHdoxT9mzU-emQknDHE-WHWo9aGaZU5YE2H4w3a6zfdSGFb/edit
2. 対象年月、稼働時間を入力して送信する
3. 請求書PDFが自動生成され、[請求書・交通費精算書スプレッドシート](https://docs.google.com/spreadsheets/d/1VGExYbodOv9Xh3maxHK-QuIXckG-Mxh8RjPJkL_Si8k/edit#gid=885621543)の「invoice_history」シートに履歴が記録される

> **注意**: 自分のマスタ情報（住所・銀行口座等）は [user_master シート](https://docs.google.com/spreadsheets/d/1VGExYbodOv9Xh3maxHK-QuIXckG-Mxh8RjPJkL_Si8k/edit#gid=1097407262)で管理されています。変更がある場合は経理担当者に連絡してください。

### 1-2. 交通費精算の提出（該当月のみ）

交通費が発生した場合に精算書を提出します。

1. **請求書申請アプリ**（上記と同じアプリ）を開く
   - https://script.google.com/u/0/home/projects/1fClzT9rZdZHdoxT9mzU-emQknDHE-WHWo9aGaZU5YE2H4w3a6zfdSGFb/edit
2. 交通費の情報（使用日、訪問先、乗車駅、降車駅、金額等）を入力して送信する
3. データは[交通費データシート](https://docs.google.com/spreadsheets/d/1VGExYbodOv9Xh3maxHK-QuIXckG-Mxh8RjPJkL_Si8k/edit#gid=2144378650)に記録される

### 1-3. 出張報告書の提出（出張時）

出張を行った場合に報告書を提出します。

1. **出張報告書アプリ**を開く
   - https://script.google.com/a/macros/sento.group/s/AKfycbx9HO6MvY2aTLZrk136et7l8G_Ee0dX_TFRhY3youVuIphlYaVrnneDRhTScxTSHjU/exec
   - GASプロジェクト: https://script.google.com/u/0/home/projects/1YLkPCdjzpWhLXPPj2jdXFjto6UjeqlTtmOmgVfTwD_hIfVzHvr_BhrYp/edit
2. 以下の情報を入力して提出する
   - 出張者氏名
   - 出張先
   - 出張期間（開始日〜終了日）
   - 目的
   - 顛末（結果・所感）
   - 日程データ（日ごとの行先・目的・内容）
3. データは[出張報告書スプレッドシート](https://docs.google.com/spreadsheets/d/1PWpwbHDLTamqPzyuoMC-xz8Q3XWLaJ7AeD-CYVL9Gzc/edit#gid=1526177947)に記録される

---

## 2. 経理担当者が行う作業

### 2-1. メンバー請求の確認・転記（毎月）

メンバーから提出された請求書を確認し、経理管理シートに転記します。

1. [請求書・交通費精算書 - 請求費+交通費シート](https://docs.google.com/spreadsheets/d/1VGExYbodOv9Xh3maxHK-QuIXckG-Mxh8RjPJkL_Si8k/edit#gid=1890863559)で、各メンバーの請求金額と交通費を確認する

### 2-2. 外注費の管理（毎月）

外注先からの請求を管理します。

1. [経理管理 - 外注費シート](https://docs.google.com/spreadsheets/d/1armGbZLHJCtiD7XB8YeLyus8l56hsuk2Fbz2DdRFWm4/edit#gid=1337300912)を開く
2. 各外注先の提出状況を確認する（「提出」列）
3. 金額を確認し、Board登録を行う（「Board登録」列をチェック）

### 2-3. カード決済の管理（毎月）

法人カードの利用明細を管理します。

1. [経理管理 - カード決済シート](https://docs.google.com/spreadsheets/d/1armGbZLHJCtiD7XB8YeLyus8l56hsuk2Fbz2DdRFWm4/edit#gid=1715663057)を開く
2. 利用明細を確認し、各決済の目的・ツール名を記入する
3. 確認が完了したら「提出Check」列をチェックする

### 2-4. Freee への登録（毎月）

確認済みの費用をFreeeに登録します。

1. [経理管理 - Freee登録シート](https://docs.google.com/spreadsheets/d/1armGbZLHJCtiD7XB8YeLyus8l56hsuk2Fbz2DdRFWm4/edit#gid=1700254211)を開く
2. 分類（外注費等）、名前、科目、金額、日付を確認する
3. Freeeに登録する

### 2-5. 月次集計の確認（毎月）

売上・費用の月次集計を確認します。

1. [経理管理 - 月次シート](https://docs.google.com/spreadsheets/d/1armGbZLHJCtiD7XB8YeLyus8l56hsuk2Fbz2DdRFWm4/edit#gid=651578256)を開く
2. 当月の売上、カード決済総額、外注費合計、粗利を確認する
3. [経理管理 - ダッシュボード](https://docs.google.com/spreadsheets/d/1armGbZLHJCtiD7XB8YeLyus8l56hsuk2Fbz2DdRFWm4/edit#gid=2100878819)で全体の経営状況を俯瞰する

### 2-6. 売上管理（随時）

クライアントへの請求を管理します。

1. [経理管理 - 売上シート](https://docs.google.com/spreadsheets/d/1armGbZLHJCtiD7XB8YeLyus8l56hsuk2Fbz2DdRFWm4/edit#gid=1970269312)を開く
2. 各クライアント・案件の請求状況（Check列）を確認する
3. 請求予定のものについて請求処理を行う

### 2-7. 出張報告書の確認（随時）

メンバーから提出された出張報告書を確認します。

1. [出張報告書 - 報告書データシート](https://docs.google.com/spreadsheets/d/1PWpwbHDLTamqPzyuoMC-xz8Q3XWLaJ7AeD-CYVL9Gzc/edit#gid=1526177947)を開く
2. 提出日・確認日を確認し、内容をレビューする
3. 出張に伴う交通費が正しく精算されているか照合する

### 2-8. メンバー・クライアント情報の管理（随時）

マスタデータを最新の状態に保ちます。

- **メンバー情報**: [経理管理 - sentoメンバーシート](https://docs.google.com/spreadsheets/d/1armGbZLHJCtiD7XB8YeLyus8l56hsuk2Fbz2DdRFWm4/edit#gid=1305289307)
- **請求書用マスタ**: [請求書・交通費精算書 - user_master](https://docs.google.com/spreadsheets/d/1VGExYbodOv9Xh3maxHK-QuIXckG-Mxh8RjPJkL_Si8k/edit#gid=1097407262)
- **クライアント情報**: [経理管理 - クライアントシート](https://docs.google.com/spreadsheets/d/1armGbZLHJCtiD7XB8YeLyus8l56hsuk2Fbz2DdRFWm4/edit#gid=1337880078)
- **サービス一覧**: [経理管理 - サービス一覧シート](https://docs.google.com/spreadsheets/d/1armGbZLHJCtiD7XB8YeLyus8l56hsuk2Fbz2DdRFWm4/edit#gid=1147371141)
- **アカウント一覧**: [経理管理 - アカウント一覧シート](https://docs.google.com/spreadsheets/d/1armGbZLHJCtiD7XB8YeLyus8l56hsuk2Fbz2DdRFWm4/edit#gid=2130866462)

---

## リンク一覧

| 名称 | URL |
|---|---|
| 請求書・交通費精算書 | https://docs.google.com/spreadsheets/d/1VGExYbodOv9Xh3maxHK-QuIXckG-Mxh8RjPJkL_Si8k/edit |
| 請求書申請アプリ (GAS) | https://script.google.com/u/0/home/projects/1fClzT9rZdZHdoxT9mzU-emQknDHE-WHWo9aGaZU5YE2H4w3a6zfdSGFb/edit |
| 出張報告書 | https://docs.google.com/spreadsheets/d/1PWpwbHDLTamqPzyuoMC-xz8Q3XWLaJ7AeD-CYVL9Gzc/edit |
| 出張報告書アプリ (GAS) | https://script.google.com/u/0/home/projects/1YLkPCdjzpWhLXPPj2jdXFjto6UjeqlTtmOmgVfTwD_hIfVzHvr_BhrYp/edit |
| 経理管理 | https://docs.google.com/spreadsheets/d/1armGbZLHJCtiD7XB8YeLyus8l56hsuk2Fbz2DdRFWm4/edit |
| 交通費精算書アプリ (GAS) | https://script.google.com/home/projects/1oIxjimDfb5t2YYjJ80I2oqdtJb-vMVvCeZWVBo6vRtsBAmNjAtbXujC3/edit |
