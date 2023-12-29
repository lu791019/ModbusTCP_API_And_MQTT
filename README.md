

# aisails

## 項目描述

此專案是一個專注於處理 ESS (儲能系統) 和 Skysails(風機) 後端接收資訊的 Node.js 應用。
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

## 規劃
後續依序增加:
- route   路由器 主要後續這邊找 call 哪支api
- controller  主要處理相關邏輯
- logger 增加log 紀錄相關info 
- sequelize    處理跟db的溝通 用 ORM的套件
- sequelize 的migration  開DB欄位使用的套件
- cors 議題  後續有前端需要用到 安裝套件而已
- 是否有crontab 排程 安裝套件而已
- middleware  中介層 處理如登入議題
- jwt-token 處理登入轉換

## 架構規劃

project/
+ routes/
    + essRoutes.js
+ controllers/
    + essController.js
+ services/
    + essService.js
+  models/
    + essModel.js
+ middlewares/
    + loggerMiddleware.js
    + authMiddleware.js
+ migrations/
+ config/
    + sequelizeConfig.js
+ app.js
+ package.json
+ .gitignore


子目錄功能：

- routes/: 存放路由相关的文件，essRoutes.js 可能包含与路由相关的代码。
- controllers/: 存放控制器相关的文件，essController.js 可能包含与控制器相关的代码。
- services/: 存放服务相关的文件，essService.js 可能包含服务层的逻辑。
- models/: 存放模型相关的文件，essModel.js 可能包含数据库模型的定义。
- middlewares/: 存放中间件相关的文件，loggerMiddleware.js 和 authMiddleware.js 可能包含不同的中间件。
- migrations/: 存放数据库迁移相关的文件。
- config/: 存放配置相关的文件，sequelizeConfig.js 可能包含 Sequelize（ORM）的配置。
- app.js: 应用程序的入口文件。
- package.json: 项目的包管理文件。
- .gitignore: Git 版本控制的忽略文件。
