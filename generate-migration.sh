#!/bin/bash

# 生成遷移文件
npx sequelize-cli migration:generate --name $1

# 獲取最新生成的遷移文件名
latest_migration=$(ls -t postgresqlDB/migrations | head -n1)

# 重命名為 .cjs
mv "postgresqlDB/migrations/$latest_migration" "postgresqlDB/migrations/${latest_migration%.js}.cjs"

