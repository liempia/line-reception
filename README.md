# 受付QRコードシステム README

## 概要
このプロジェクトは、イベント受付を効率化するためのQRコードを利用した受付システムです。LINEアカウントを用いた受付確認を行い、Google Apps Script（GAS）を利用して受付記録をスプレッドシートに保存します。

現在、システムは以下のURLで運用されています：
[受付QRコードシステム](https://line-reception.liempia.app/)

## 機能
1. **QRコード生成**  
   - 設定したLINEアカウントとイベントIDを元に、QRコードを作成。
   - 参加者がQRコードをスキャンすると、LINEで受付メッセージを送信できる。

2. **受付番号管理**  
   - 受付ごとに一意の受付番号を発行。
   - 受付番号に基づいた確認コードを計算し、参加者に通知。

3. **LINE Botとの連携**  
   - 参加者がLINEで受付メッセージを送ると、確認コードが返信される。
   - 受付端末で確認コードを入力すると、受付完了。

4. **受付記録の保存**  
   - Google スプレッドシートに受付データ（タイムスタンプ、ユーザーID、メッセージID、メッセージ内容）を記録。

---

## ファイル構成
- **index.html**（[Cloudflare Pageで公開中](https://line-reception.liempia.app/)）  
  - フロントエンド（HTML、CSS、JavaScript）
  - 受付QRコードを表示し、確認コードの入力を管理。

- **Google Apps Script（GAS）**  
  - `doPost(e)`: LINEからのメッセージを処理し、確認コードを返信。
  - `sendTextMessage(replyToken, message)`: LINEメッセージを送信する関数。

---

## 使い方
### 1. 設定
1. [受付QRコードシステム](https://line-reception.liempia.app/) にアクセス。
2. LINEアカウント（LINE公式アカウントID）とイベントIDを入力。
3. 「設定完了」ボタンをクリック。

### 2. 受付の流れ
1. 参加者が受付端末に表示されたQRコードをスキャンし、LINEで受付メッセージを送信。
2. LINE Botが受付番号を解析し、確認コードを返信。
3. 参加者が受付端末で確認コードを入力すると受付完了。

### 3. Google Apps Script の設定
1. **Google スプレッドシートを開く**
   - [Google スプレッドシート](https://docs.google.com/spreadsheets/) にアクセスし、新しいスプレッドシートを作成。
   - メニューから **[拡張機能] → [Apps Script]** をクリックし、Google Apps Script を開く。

2. **スクリプトを追加**
   - `doPost(e)` および `sendTextMessage(replyToken, message)` をスクリプトエディタに追加。
   - `LINE_CHANNEL_ACCESS_TOKEN` を設定。

3. **LINE Developers コンソールでWebhook URLを登録**
   - 作成したGoogle Apps ScriptのWebアプリとしてのURLを取得し、LINE BotのWebhook URLに設定する。

---

## 環境要件
- **Webサーバー**（Cloudflare Page でホスト）
- **LINE公式アカウント**
- **Google Apps Script（GAS）**
- **Google スプレッドシート**

---

## 注意事項
- `LINE_CHANNEL_ACCESS_TOKEN` は機密情報のため、外部に公開しないよう注意。
- Google Apps Script のスプレッドシート権限を適切に設定すること。
- イベントIDは適切に管理し、重複を避ける。

---

## 今後の改善点
- 受付番号のリセット機能
- 管理者向けの受付状況表示機能
- 受付データのエクスポート機能


Copyright (c) [2025] [LiemPia inc]

このソフトウェアは MITライセンスのもとで公開されています。
https://opensource.org/licenses/MIT
