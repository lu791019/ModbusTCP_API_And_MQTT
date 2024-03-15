# 使用官方 Node.js 20 基礎映像
# 使用官方 Node.js 20 基礎映像
FROM node:20.11.1-bullseye

RUN echo "deb [trusted=yes] https://deb.debian.org/debian bullseye main" > /etc/apt/sources.list

# 安裝依賴，添加 Docker 官方 GPG 密鑰，添加 Docker apt 儲存庫
RUN apt-get update && \
    apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/debian \
    $(lsb_release -cs) \
    stable"

# 安裝 Docker Engine
RUN apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io

# 創建並設定工作目錄
WORKDIR /var/www

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
