# agit
简化或增强一些git操作，例如：
1. clone 代码参考时自动设置用户信息。
2. checkout分支时添加备注。

# 安装：
```
npm install agit -g
```
# 使用
```
// 配置用户信息，在clone代码时会自动应用
agit config user.name=xxx user.email=xxx@xx.com

// clone代码
agit clone https://github.com/swxy/test.git

.....
```
# api
1. checkout: 切换分支
  ```
  agit checkout master -m "主干"  // 首次时最好加 -m 添加描述信息，后面可以不用再加
  ```

2. del: 删除描述信息
  ```
  agit del master // 删除master分支的描述信息， 注意不会删除分支

  // 如果加了  -a 或者 --all, 表示删除所有描述信息
  agit del -a
  ```

3. ls: 展示所有的描述信息
  ```
  agit ls

  // 或者可以展示某一个分支的信息
  agit ls branchName
  ```
4. config: 配置一些基本信息
  ```
  // 如果带有参数，则会保存配置， 参数和git原生有点差别 配置项名称和配置的值用 = 连接
  agit config user.name=xxxx user.email=xxx@xx.com

  // 如果不带参数, 则应用已经保存的配置
  agit config

  // 支持 -l --list 展示已有配置
  agit config -l

  // -d --delete  删除配置项
  agit config -d user.name // 上传user.name 配置

  // -c --clear  清空所有配置项
  agit config -c
  ```
5. clone： 克隆代码库，同时会应用已有的配置
  ```
  agit clone https://github.com/swxy/test.git

  // 等价于以下操作
  git clone https://github.com/swxy/test.git
  cd test
  agit config
  ```
