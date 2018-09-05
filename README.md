# Install
```bash
$ npm install git+https://git2.qingtingfm.com/zhibo/xms.git --save
```

# How to use
```javascript
import xms from 'xms';

const app = xms(config);
app.start('#root');
```

```javascript
import { DateType } from 'xms';

const { NUMBER, STRING,DATETIME } = DataType;
```

```javascript
import { request } from 'xms';

request.get(path, { params });

request.post(path, { body });

request.put(path, { body });

request.remove(path);
```

# Config
* name
    * type：string
    * required
    * value：项目中文名称，显示在Header里
* api
    * type：object
    * required
    * value：见[api](#api)
* routes
    * type：array[object]
    * value：route数组，见[route](#route)

# api
* host
    * type：string
    * required
    * value：api域名
* login
    * type：string
    * value：登录api路径，不填则不需要用户登录；此外支持登录的网站域名必须是*.qingtingfm.com

# route
* path
    * type：string
    * required
    * value：页面路径
* title
    * type：string
    * value：页面标题，用于显示在Menu和Breadcrumb上
* breadcrumb
    * type：string/function(matchParams)
    * value：用于Breadcrumb上的标题
* inline
    * type: bool
    * value：true的话该页面数据会展示在父页面上
* component: 页面组件
    * type：react node/function
* config
    * type：object
    * value：根据config自动生成页面组件，如果同时配置了component，两者会层叠显示，component在上，具体见[config](#config)

# config
* type
    * type：string
    * value：
        * single：单个数据页面
        * group：列表数据页面
* api
    * type：object
    * value：
        * path
            * type：string
            * value：页面数据api路径，需符合restful标准
        * defaultFilter
            * type：object/function(matchParams)
            * value：默认filter, 获取数据时永远会带上这个filter。后台API应该统一用query里的filter（json string）来筛选数据
* actions：该页面支持的所有操作
    * type：array[string/object]
    * string：预设的操作
        * create: 创建
        * edit: 编辑
        * remove: 删除
        * order: 调整顺序
        * default：创建 + 编辑 + 删除
    *  object：自定义操作
        * title：操作名称
            * type：string 
        * handler：操作函数，会传入该行的数据。一般使用request，见顶部
            * type：function(record) 
        * enable：是否为该行数据启动该操作
            * type：function(record) 
        * type：按钮类型，参数同antd的Button，有primary、default、danger、dashed。 
* schema
    * type：array[object] 
    * value：数据结构，见[definition](#difinition)

# definition
* key
    * type：string
    * value：数据源中对应的key
* type
    * type：string
    * value：数据源中对应的数据格式
        * number：以数字格式显示数据
        * string：以文本格式显示数据
        * datetime：以时间格式显示数据
        * order：该属性为列表排序属性，只能有一个，且存在order属性情况下，不允许设置其他sort信息
        * image：以图片格式显示数据
        * enum：该属性可以用来筛选，必须和filters搭配使用
* title
    * type：string
    * value：表格或创建/编辑窗口的数据名称
* visibility
    * type：object
    * value：
        * table
            * type：bool
            * value：该数据是否显示在表格中
        * edit
            * type：bool
            * value：该数据是否显示在编辑窗口中
        * create
            * type：bool
            * value：该数据是否显示在创建窗口中
    *  shorthand
        * true：table，create，edit均为true
        * 'all'：table，create，edit均为true
        * 'table'：table为true
        * 'modal'：create，edit为true    
* link
    * type：object
    * value：用于配置链接
        * type 
            * type：strng
            * value：
                * external：外站链接
                * relative：在当前页面path下扩展
                * absolute：会在当前host下扩展
        * template
            * type：string
            * value：链接的path，如果需要用到model中的数据，请用‘{key}’的表示
* sort
    * type：obejct
    * value：配置排序
        * asc
            * type：bool  
            * value：该属性支持升序排序
        * desc：
            * type：bool  
            * value：该属性支持降序排序 
    *  shorthand
        * true：asc，desc均为true
        * 'asc'：仅asc为true
        * 'desc'：仅desc为true
* defaultSort
    * type：'asc'/'desc'  
    * value：该属性作为该列表的默认排序  
* search
    * type：bool
    * value：是否支持用该属性模糊搜索
* imageSize:
    * type：string
    * default value：'100x100'
    * value：`${width}x${height}`
* renderValue：
    * type：function(record)
    * value：自定义函数，获取展示值
* filters：该属性的所有过滤信息，格式与antd的Table的filters相同
    * array[object]
        * text：所对应的显示文字
            * type：string/number 
        * value：后台数据所对应的值 
            * type：string/number
    * function：动态获取过滤信息，返回的格式必须是上述的array[object] 

#API要求
* 遵循RESTFUL规范
* 列表返回结果应该包含items和total
* query
    * page：页码
    * pagesize：分页大小
    * filter：筛选条件，decode后值为object，里面每个key/value代表要筛选的条件；支持用%模糊搜索；支持or，其值为obejct，代表满足其中任何一组key/value均可
    * order：排序条件，`${key} ${order}`的形式，其中order取值为asc、desc
