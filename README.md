# Install
```bash
$ npm install git+https://git2.qingtingfm.com/zhibo/xms.git --save
```

# How to use
```javascript
import xms from 'xms';

const app = xms(config);
app.start();
```

```javascript
import { DateType } from 'xms';

const { NUMBER, STRING, DATETIME, ENUM, URL } = DataType;
```

```javascript
import { request } from 'xms';

request.get(path, { params });

request.post(path, { body });

request.put(path, { body });

request.remove(path);
```

# Config
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| name | 项目中文名称，显示在顶部 | string | '' |
| api | api配置，见[api](#api) | object | {} |
| routes | 路由配置，见[route](#route) | object[] | [] |

# api
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| host | api服务器域名 | string | '' |
| login | 登录api路径，不填则不需要用户登录；此外支持登录的网站域名必须是*.qingtingfm.com | string | '' |

# route
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| path | 页面路径，同[react-router](https://reacttraining.com/react-router/web/example/route-config) | string | '' |
| title | 页面导航菜单标题，为空则该页面不显示在导航菜单上 | string | '' |
| breadcrumb | 页面面包屑标题 | string|Function(matchParams) | '' |
| inline | 该页面数据会内嵌展示在父页面上 | bool | false |
| component | 页面组件，object配置见[component](#component) | object|React.ReactNode | - |
| config | 页面配置，会根据其自动生成页面组件，如果同时配置了component，两者会层叠显示，component在上，见[config](#config) | object | {} |

# component
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| models | 动态引入dva model | (Function() -> import())[] | [] |
| component | 动态引入React.ReactNode | Function() -> import() | - |

# config
* type
    * 类型：string
    * 值：
        * single：单个数据页面
        * group：列表数据页面
* api
    * 类型：object
    * 值：页面api相关配置
        * path
            * 类型：string/function(matchParams)
            * 值：页面数据api路径（不包括id），需符合restful标准，如果需要页面path计算，可用函数。
        * defaultFilter
            * 类型：object/function(matchParams)
            * 值：默认filter, 获取数据时永远会带上这个filter。后台API应该统一用query里的filter（json string）来筛选数据
* actions：该页面支持的所有操作
    * 类型：array[string/object]
    * string：预设的操作
        * create: 创建
        * edit: 编辑
        * remove: 删除
        * order: 调整顺序
        * default：创建 + 编辑 + 删除
    *  object：自定义操作
        * title
            * 类型：string 
            * 值：操作名称
        * handler
            * 类型：function(record) 
            * 值：操作函数，会传入该行的数据。一般使用request，见顶部
        * enable
            * 类型：function(record) 
            * 值：是否为该行数据启动该操作
        * type
            * 类型：string    
            * 值：按钮类型，参数同antd的Button，有primary、default、danger、dashed。 
        * render
            * 类型：function(record, matchParams)
            * 值：自定义渲染组件，会忽略title、type和handler的值。另外注意返回的组件需要设置key
        * rowSelection
            * 类型：bool
            * 值：该操作是否支持多行批量执行
* schema
    * 类型：array[object] 
    * 值：数据结构，见[definition](#difinition)

# definition
* key
    * 类型：string
    * 值：数据源中对应的key
* type
    * 类型：string
    * 值：数据源中对应的数据格式
        * number：以数字格式显示数据
        * string：以文本格式显示数据
        * datetime：以时间格式显示数据
        * order：该属性为列表排序属性，只能有一个，且存在order属性情况下，不允许设置其他sort信息
        * image：以图片格式显示数据
        * enum：该属性为枚举类型，必须和filters搭配使用
        * url: 网页链接
* title
    * 类型：string
    * 值：表格或创建/编辑窗口的数据名称
* visibility
    * 类型：object
    * 值：
        * table
            * type：bool
            * value：该数据是否显示在表格中
        * edit
            * type：bool
            * value：该数据是否显示在编辑窗口中
        * create
            * type：bool
            * value：该数据是否显示在创建窗口中
    * 简化写法
        * true：table，create，edit均为true
        * 'all'：table，create，edit均为true
        * 'table'：table为true
        * 'modal'：create，edit为true    
* link
    * 类型：object
    * 值：用于配置链接
        * type 
            * 类型：strng
            * 值：
                * external：外站链接
                * relative：在当前页面path下扩展
                * absolute：会在当前host下扩展
        * template
            * 类型：string
            * 值：链接的path，如果需要用到model中的数据，请用‘{key}’的表示
* sort
    * 类型：obejct
    * 值：配置排序
        * asc
            * 类型：bool  
            * 值：该属性支持升序排序
        * desc：
            * 类型：bool  
            * 值：该属性支持降序排序 
    *  简化写法
        * true：asc，desc均为true
        * 'asc'：仅asc为true
        * 'desc'：仅desc为true
* defaultSort
    * 类型：'asc'/'desc'  
    * 值：该属性作为该列表的默认排序  
* search
    * 类型：bool
    * 值：是否支持用该属性模糊搜索
* imageSize:
    * 类型：string
    * 默认值：'100x100'
    * 值：`${width}x${height}`
* renderValue：
    * 类型：function(record)
    * 值：自定义函数，获取展示值
* filters：该属性的所有过滤信息，格式与antd的Table的filters相同
    * 类型：array[object]/function
    * object
        * text
            * 类型：string/number 
            * 值：所对应的显示文字
        * value
            * 类型：string/number
            * 值：后台数据所对应的值 
    * function：动态获取过滤信息，返回的格式必须是上述的array[object]
* canFilter
    * 类型：bool
    * 值：是否可以用该属性筛选数据

#API要求
* 遵循RESTFUL规范
* 列表返回结果应该包含items和total
* query
    * page：页码
    * pagesize：分页大小
    * filter：筛选条件，decode后值为object，里面每个key/value代表要筛选的条件；支持用%模糊搜索；支持or，其值为obejct，代表满足其中任何一组key/value均可
    * order：排序条件，`${key} ${order}`的形式，其中order取值为asc、desc
