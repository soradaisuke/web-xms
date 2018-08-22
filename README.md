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
    * value：
        * host
            * type：string
            * required
            * value：api host
* routes
    * type：object array
    * value：以页面为单位进行配置
        * path
            * type：string
            * required
            * value：页面path
        * title
            * type：string
            * value：标题，用于显示在Menu和Breadcrumb上
        * breadcrumb
            * type：string/function(match.params)
            * value：用于Breadcrumb上的标题，函数的话第一个参数为react-router的match.params
        * config
            * type：object
            * value：
                * api
                    * type：object
                    * value：
                        * path
                            * type：string
                            * value：api path
                        * defaultFilter
                            * type：object
                            * value：默认filter
                        * defaultOrder
                            * type：string
                            * value：默认order
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
                    * type：object array
                    * value：数据格式
                        * key
                            * type：string
                            * value：model中对应的key
                        * type
                            * type：'number'/'text' 
                            * value：model中对应的数据格式
                        * title
                            * type：string
                            * value：用于显示在Tabel title或Label
                        * visibility
                            * type：object/bool/'all'/'tabel'/'modal'
                            * value：
                                * tabel
                                    * type：bool
                                    * value：该数据是否显示在tabel中
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

