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

# App配置
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| name | 项目中文名称，显示在顶部 | string | - |
| api | api配置，见[api](#app_api) | object | - |
| routes | 路由配置，见[route](#route) | object[] | [] |

# App api
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| host | api服务器域名 | string | - |
| login | 登录api路径，不填则不需要用户登录；此外支持登录的网站域名必须是*.qingtingfm.com | string | - |

# route
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| path | 页面路径，同[react-router](https://reacttraining.com/react-router/web/example/route-config) | string | - |
| title | 页面导航菜单标题，为空则该页面不显示在导航菜单上 | string | - |
| breadcrumb | 页面面包屑标题 | string/Function(matchParams) | - |
| inline | 该页面数据会内嵌展示在父页面上 | bool | false |
| component | 页面组件，object配置见[component](#component) | object/React.ReactNode | - |
| config | 页面配置，会根据其自动生成页面组件，如果同时配置了component，两者会层叠显示，component在上，见[config](#config) | object | - |

# component
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| models | 动态引入dva model | (Function() -> import())[] | [] |
| component | 动态引入React.ReactNode | Function() -> import() | - |

# config
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| type | 页面类型<br />single：单个数据页面<br />group：列表数据页面 | string(single, group) | - |
| api | 页面api配置，见[api](#route_api) | string(single, group) | - |
| actions | 该页面支持的所有操作<br />create: 创建<br />edit: 编辑<br />remove: 删除<br />order: 调整顺序<br />default：创建 + 编辑 + 删除<br />object见[action](#action) | (string/object)[] | [] |
| schema | 数据结构，见[schema](#schema) | object[] | [] |

# route api
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| path | 页面数据api路径（不包括id），需符合restful标准 | string/Function(matchParams) | - |
| defaultFilter | 默认filter, 获取数据时永远会带上这个filter。后台API应该统一用query里的filter（json string）来筛选数据 | object/Function(matchParams) | - |

# action
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| title | 操作名称 | string | - |
| handler | 操作函数 | Function(record, matchParams) | - |
| enable | 是否为该行数据启用该操作 | Function(record, matchParams) | - |
| type | 按钮类型，参数同antd的Button，有primary、default、danger、dashed | string | - |
| render | 自定义渲染组件，会忽略title、type和handler的值<br />返回的组件需要设置key<br/ >如果需要在某个操作后刷新数据，请执行refresh() | Function(record, matchParams, refresh) | - |
| rowSelection | 该操作是否支持多行批量执行 | bool | false |

# schema
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| key | 数据源中对应的key | string | - |
| type | 数据源中对应的数据格式<br />number：以数字格式显示数据<br />string：以文本格式显示数据<br />datetime：以时间格式显示数据<br />order：该属性为列表排序属性，只能有一个，且存在order属性情况下，不允许设置其他sort信息<br />image：以图片格式显示数据<br />enum：该属性为枚举类型，必须和filters搭配使用<br />url: 网页链接 | string(number, string, datetime, order, image, enum, url) | - |
| title | 表格或创建/编辑窗口的数据名称 | string | - |
| visibility | 数据可视性<br />true or all：表格、创建和修改时均可见<br />table：仅在表格中可见<br />edit：仅在编辑时可见<br />modal：仅在创建和编辑时可见<br />object配置见[visibility](#visibility) | bool/string(all, table, modal)/object | - |
| link | 链接配置，见[link](#link) | object | - |
| sort | 排序配置<br />true：支持升序和降序排序<br />asc：支持升序排序<br />desc：支持降序排序<br />object配置见[sort](#sort) | bool/string(asc, desc)/object | - |
| defaultSort | 该属性作为该列表的默认排序及默认排序类型 | string(asc, desc) | - |
| search | 是否支持用该属性模糊搜索 | bool | false |
| imageSize | 图片大小，{width}x{height} | string | 100x100 |
| renderValue | 自定义函数，获取展示值 | Function(record) | - |
| filters | 该属性的所有过滤信息，支持函数动态获取，返回格式也需要是object[]，见[filters](#filters) | object[]/Function() | [] |
| canFilter | 是否可以用该属性筛选数据 | bool | false |

# visibility
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| table | 该数据是否显示在表格中 | bool | false |
| edit | 该数据是否显示在编辑窗口中 | bool | false |
| create | 该数据是否显示在创建窗口中 | bool | false |

# link
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| type | 链接类型<br />external：外站链接<br />relative：在当前页面path下扩展<br />absolute：会在当前host下扩展 | string(external, relative, absolute) | - |
| template | 链接的path，如果需要用到model中的数据，请用‘{key}’的表示 | string | - |

# sort
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| asc | 该属性支持升序排序 | bool | false |
| desc | 该属性支持降序排序 | bool | false |

# filters
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| text | 所对应的显示文字 | string/number | - |
| value | 后台数据所对应的值  | string/number | - |

#API要求
* 遵循RESTFUL规范
* 列表返回结果应该包含items和total
* query
    * page：页码
    * pagesize：分页大小
    * filter：筛选条件，decode后值为object，里面每个key/value代表要筛选的条件；支持用%模糊搜索；支持or，其值为obejct，代表满足其中任何一组key/value均可
    * order：排序条件，`${key} ${order}`的形式，其中order取值为asc、desc
