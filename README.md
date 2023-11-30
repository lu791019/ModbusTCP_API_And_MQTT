

# aisails

## 項目描述

aisails 是一個專注於處理 ESS (儲能系統) 後端接收資訊的 Node.js 應用。本項目使用 Node.js 16 和 Express 框架，主要負責接收、處理和存儲來自儲能系統的數據。項目的目標是為儲能系統提供穩定、可靠的數據處理能力，並在未來支持更多後端 API 集成。

## 安裝指南

### 先決條件

- Node.js (v20)
- npm (隨 Node.js 安裝)

## 功能

接收和處理來自 ESS 儲能系統的數據。
數據存儲和管理。
(未來功能) 提供後端 API 集成。

## 規劃
後續可能需要依序增加:
route   路由器 主要後續這邊找 call 哪支api
controller  主要處理相關邏輯
logger 增加log 紀錄相關info 
sequelize    處理跟db的溝通 用 ORM的套件
sequelize 的migration  開DB欄位使用的套件
cors 議題  後續有前端需要用到 安裝套件而已
是否有crontab 排程 安裝套件而已
middleware  中介層 處理如登入議題
jwt-token 處理登入轉換
