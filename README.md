# agit
解决git checkout分支时不支持comment的问题。

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