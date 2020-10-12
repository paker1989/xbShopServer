```bash
# 安装
brew update
brew install redis

# 启动
brew services start redis

# To see if redis is running at background run :
redis-cli ping

# remove
brew uninstall redis
# to remove legacy files
rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

# 启动redis-cli
redis-cli
```