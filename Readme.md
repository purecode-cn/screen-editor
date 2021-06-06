# Screen Editor

**正在慢慢写，欢迎添加图表，也希望有人能帮助做做图标什么的**

一个大屏设计前端组件，主要使用到以下技术：

* React
* Craftjs
* AntDesign
* ECharts
* ArcGIS
* GaoDe

# 启动
准备好 FontAwesome 的 Token，在根目录创建 `.npmrc` 文件。文件内容如下：
```
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=«YOUR TOKEN»
```
然后运行以下命令：
```
> yarn
> yarn storybook
```
在打开的浏览器中查看 storybook 的各个实例。

# 截图
![截图](./assets/screenshot.png)

# 文件结构

```
├─charts        各种图表
│  ├─amap       高德
│  ├─arcgis     ArcGis
│  ├─bar        柱图
│  ├─container  容器
│  ├─control    交互控件
│  ├─indicator  指标
│  ├─line       线图
│  ├─media      媒体
│  ├─pie        饼图
│  ├─table      表格
│  └─text       文本
├─components    底层组件，用于设置项和页面元素
├─designer      设计器中的各个组件
├─editor        右侧设置项的容器组件
│  └─fields     成组的设置项，如位置、边距、图例等待
├─hooks         一些 Hook
└─utils
```