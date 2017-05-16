# agit
解决git checkout分支时不支持comment的问题。

安装：
```
npm install agit -g
```

# api
1. checkout: 切换分支
  ```
  agit checkout master -m "主干"  // 首次时最好加 -m 添加描述信息，后面可以不用再加
  ```

2. del: 删除描述信息
  ```
  agit del master // 删除master分支的描述信息， 注意不会删除分支
  ```

3. ls: 展示所有的描述信息
  ```
  agit ls
  ```
4. config: 配置一些基本信息
  ```
  // 如果带有参数，则会保存配置， 参数和git原生有点差别 配置项名称和配置的值用 = 连接
  agit config user.name=xxxx user.email=xxx@xx.com

  // 如果不带参数, 则应用已经保存的配置
  agit config
  ```
5. clone： 克隆代码库，同时会应用已有的配置
  ```
  agit clone https://github.com/swxy/test.git

  // 等价于以下操作
  git clone https://github.com/swxy/test.git
  cd test
  agit config
  ```
