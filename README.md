# aisails

## 項目描述

aisails 是一個專注於處理 ESS (儲能系統) 和 Skysails(風機) 後端接收資訊的 Node.js 應用。
本項目使用 Node.js 16 和 Express 框架，主要負責接收、處理和存儲來自儲能系統的數據。項目的目標是為儲能系統提供穩定、可靠的數據處理能力，並在未來支持更多後端 API 集成。

## 安裝指南

### 先決條件

- Node.js (v20)
- npm (隨 Node.js 安裝)

## 功能

接收和處理來自 ESS 儲能系統的數據，使用RESTful API傳送資料進來
接收和處理來自 Skysails 風機的數據，使用MQTT協議傳送資料進來
數據存儲和管理。
(未來功能) 提供後端 API 集成。

## 啟動

```
cp .env.example .env
npm install
npm start

```

## DB 使用

```
   #  create_table_name 為要建立的資料表名稱
    yarn migration:generate  create_table_name
   #  執行資料庫遷移
    yarn migrate
```

## 測試

```bash
npm run test
```

因為使用ES6的語法 使用jest 來做測試
裡面可以看到很多 是因為需要配合 ES6寫法使用

```javascript
jest.unstable_mockModule('promise-ftp', () => ({...}))
```

# 特別說明的part

## Lidar

本案使用的高空風能數據來自,工研院合作的資訊
資料來源為ftp 連線 下載的資料 有提過使用modbus tcp 串接但是無提供
下載的資料為ZPH 這是一個二維的資料 是廠商的特規資料
需要使用廠商提供的exe安裝檔來解析資料 並轉成csv檔案
目前檔案轉換包成image使用
請使用 amd64 的機器來執行 沒有包arm 架構的機器

```bash
docker pull sony791210/wind-zph-csv
```

## SkysailsController

本案因為訂閱的資料量大,所以使用了MQTT協定來接收資料 每秒約有30筆資料寫入
因為都是單一筆資料寫入DB id 很快就會弄完 所以特別寫個程式來判斷是否弄完id
並且定期清理資訊
