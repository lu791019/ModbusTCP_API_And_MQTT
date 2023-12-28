# 使用官方 Node.js 20 基礎映像
FROM  node:20.10.0-buster-slim

# 創建並設定工作目錄
WORKDIR /usr/src/app

# 將 package.json 和 package-lock.json 複製到工作目錄
COPY package*.json ./

# 安裝項目依賴
RUN npm install

# 複製項目文件到工作目錄
COPY . .

# 您的應用程序會使用的端口
EXPOSE 3000

# 定義運行時如何啟動應用程序
CMD [ "npm","run" ,"start" ]
