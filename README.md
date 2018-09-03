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
    * type：array
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
    * type：string/function
    * value：用于Breadcrumb上的标题
        * function (params)：react-router的match.params
* component
    * type：react node
    * value：页面组件
* config
    * type：object
    * value：根据config自动生成页面组件，会忽略component的值，具体见[config](#config)

# config
* type
    * type：'single'/'group'
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
            * type：object
            * value：默认filter
* action
    * type：object/bool/'all'/
    * value:
        * create
            * type：bool
            * value：是否支持创建
        * edit
            * type：bool
            * value：是否支持编辑
        * remove
            * type：bool
            * value：是否支持删除
        * order
            * type：bool
            * value：是否支持排序
    *  shortcut
        * true：create，edit，remove，order均为true
        * all：create，edit，remove，order均为true
* schema
    * type：definition array 
    * value：数据结构，见[definition](#difinition)

# definition
* key
    * type：string
    * value：数据源中对应的key
* type
    * type：'number'/'string'/'datetime' 
    * value：数据源中对应的数据格式
    ```javascript
    import { DateType } from 'xms';
    
    const { NUMBER, STRING,DATETIME } = DataType;
    ```
* title
    * type：string
    * value：表格或创建/编辑窗口的数据名称
* visibility
    * type：object/bool/'all'/'tabel'/'modal'
    * value：
        * tabel
            * type：bool
            * value：该数据是否显示在表格中
        * edit
            * type：bool
            * value：该数据是否显示在编辑窗口中
        * create
            * type：bool
            * value：该数据是否显示在创建窗口中
    *  shortcut
        * true：tabel，create，edit均为true
        * all：tabel，create，edit均为true
        * tabel：tabel为true
        * modal：create，edit为true    
* link
    * type：object
    * value：用于配置链接
        * type 
            * type：'external'/'absolute'/'relative'
            * value：external为外站链接，relative会在当前页面path下扩展，absolute会在当前host下扩展
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
        * default
            * type：'asc'/'desc'  
            * value：该属性作为该列表的默认排序  
* search
    * type：bool
    * value：是否支持用该属性模糊搜索
