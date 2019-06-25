# 安装
```bash
$ npm install git+https://git2.qingtingfm.com/zhibo/xms.git --save
```

# API
## xms
主app

```javascript
import xms from 'xms';

const app = xms(config);
app.start();
```

## ColumnTypes `DateType is Deperated`
数据类型定义

```javascript
import { ColumnTypes } from 'xms';

ColumnTypes.string
ColumnTypes.number
ColumnTypes.bool
ColumnTypes.date
ColumnTypes.datetime
ColumnTypes.datetimeDafaultRange
ColumnTypes.order
ColumnTypes.image
ColumnTypes.url
ColumnTypes.time
ColumnTypes.audio
ColumnTypes.enumOf(ColumnTypes.string...)
ColumnTypes.arrayOf(ColumnTypes.string...)
ColumnTypes.objectOf(ColumnTypes.string...)

```
## request
网络请求

```javascript
import { request } from 'xms';

request.get(path, { params });

request.post(path, { body });

request.put(path, { body });

request.remove(path);
```

## dynamic
动态引入React组件

```javascript
import { dynamic } from 'xms';

const MyPage = dynamic({
  app,
  models: () => [
    import('models/my'),
  ],
  component: () => import('routes/MyPage'),
});

```

## Page
基础页面React组件

| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| className | 类名 | string | - |
| isError | 是否显示错误页面 | bool | false |
| isLoading | 是否显示加载页面 | bool | false |

## ActivatorModal
由点击某个组件激活的Modal

| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| activator | 激活组件 | ReactNode | - |
| onCancel | 点击取消时的回调，返回false可以阻止modal关闭 | Function | - |
| onOk | 点击确定时的回调，返回false可以阻止modal关闭 | Function | - |
| onVisibleChange | Modal的visible变化时的回调 | Function | - |

## AudioPlayer
播放器组件

| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| url | 音频地址 | string | '' |
| loop | 是否循环播放 | bool | false |
| showPlaybackRate | 是否显示调整速率的组件 | bool | true |
| playbackRates | 播放速率可选项配置 | array | [1, 1.25, 1.5, 2] |
| showVolume | 是否显示调整音量大小的组件 | bool | true |
| className | 类名 | string | '' |

ref获得节点后可以调用的方法有

| 方法 | 说明 |
| :---- | :---- |
| pause() | 暂停播放 |
| setVolume(value) | 设置音量大小，value = 100 为100%的音量 |
| setPlaybackRate(value) | 设置播放速率，value = 1 为1倍速播放 |

## UploadImage
上传图片React组件，用于antd的FormItems。props里的onChange和value由[antd的form](https://ant.design/components/form-cn/)接管，详见[this.props.form.getFieldDecorator](https://ant.design/components/form-cn/#this.props.form.getFieldDecorator(id,-options))。

| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| title | 提示文字 | string | - |
| ssoToken | user sso token | string | - |
| modalWidth | 点击图片后显示的Modal的width | string | '500px' |
| fileMaxSize | 上传图片文件大小限制，单位MB | number | 5 |
| bucket | 上传图片用到的bucket | string | '' |
| limit: { maxWidth, minWidth, maxHeight, minHeight } | 图片宽高限制 | object: { number } | { 0 } |
| needCrop | 上传图片是否需要裁剪 | bool | false |
| aspect | 裁剪宽/高 | number | 0 |

## Tags
标签React组件，用于antd的FormItems, value: [string, ...]。props里的onChange和value由[antd的form](https://ant.design/components/form-cn/)接管，详见[this.props.form.getFieldDecorator](https://ant.design/components/form-cn/#this.props.form.getFieldDecorator(id,-options))

| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| style | 组件style | object | - |
| max | 标签最大个数限制 | number | 99 |

## CommonArray
数组组件，用于antd的FormItems, value: []。props里的onChange和value由[antd的form](https://ant.design/components/form-cn/)接管，详见[this.props.form.getFieldDecorator](https://ant.design/components/form-cn/#this.props.form.getFieldDecorator(id,-options))

| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| style | 一项数据的输入框的 style | object | { marginTop: '10px', width: '80%', marginRight: 8 } |
| max | 标签最大个数限制 | number | 99 |
| placeholder | 输入框里的 placeholder | string | '请输入一个值' |
| enableAdd | 是否可以添加一项数据，如果为 true 且传入数据长度为0的时候会自动生成一项空数据 | bool | true |
| generateValue | 非字符串ARRAY类型必须要定义此项，返回string类型的新数据值 | Function(preValue, nextValue) | (_, nextValue) => (nextValue `||` '') |
| renderValue | 非字符串ARRAY类型必须要定义此项，接收的数据是数组里的一项，返回该项在Input组件里的value | Function(value) | v => v |

## DatePickerWithPresets
带有预设的日历组件，详见[DatePicker](https://ant.design/components/date-picker-cn/#DatePicker)

| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| presets | 预设日期 | [{text: string, value: 'YYYY-MM-DD'}] | - |

## Group
带有标题和内容的组件

| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| title | 标题 | string | - |
| children | 内容 | node | - |

# config
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| type | 页面类型<br />single：单个数据页面<br />group：列表数据页面 | string(single, group) | - |
| inlineWidgetType | 内部组件展示类型，支持card, tabs, collapse | string(card, tabs, collapse) | card |
| api | 页面api配置，见[api](#route_api) | string(single, group) | - |
| actions | 该页面支持的所有操作<br />create_in_new_page: 新建（跳转至${path}/new页面）<br />create: 创建<br />edit: 编辑<br />remove: 删除<br />order: 调整顺序<br />default：创建 + 编辑 + 删除<br />object见[action](#action) | (string/object)[] | [] |
| schema | 数据结构，见[schema](#schema) | object[] | [] |

# route api
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| host | 页面数据API host, 每个页面可以设置不同的API host，只会用于自动生成的页面请求；为空的话默认使用APP配置里的API host  | string | - |
| path | 页面数据API path（不包括id），需符合restful标准 | string/Function(matchParams) | - |
| defaultFilter | 默认filter, 获取数据时永远会带上这个filter。后台API应该统一用query里的filter（json string）来筛选数据 | object/Function(matchParams) | - |

# action
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| title | 操作名称 | string | - |
| handler | 操作函数 | Function(record, matchParams) | - |
| enable | 是否为该行数据启用该操作 | Function(record, user) | - |
| type | 按钮类型，参数同antd的Button，有primary、default、danger、dashed | string | - |
| render | 自定义渲染组件，会忽略title、type和handler的值<br />返回的组件需要设置key<br/ >如果需要在某个操作后刷新数据，请执行refresh() | Function(record, matchParams, refresh) | - |
| multiple | 该操作是否支持多行批量执行，global为true时在行里不渲染 | bool | false |
| global | 该操作是否是全局操作 | bool | false |
| confirmModal | 该操作如果是弹框再确认类型，配置该项，[confirmModal](#confirmModal)，更多配置见[antd的modal.confirm](https://ant.design/components/modal-cn/#Modal.method()) | object | - |

# confirmModal
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| title | 标题 | string/ReactNode | '' |
| content | 内容，如果是multiple第一个参数为selectedRows，非multiple第一个参数为record | Function(selectedRows/record)/string/ReactNode | - |

# schema
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| key | 数据源中对应的key，key为['program', 'id']时对应{program: { id: 1 }} | string/array | - |
| type | 数据源中对应的数据格式<br />number：以数字格式显示数据<br />string：以文本格式显示数据<br />datetime：以时间格式显示数据<br />order：该属性为列表排序属性，只能有一个，且存在order属性情况下，不允许设置其他sort信息<br />image：以图片格式显示数据<br />enum：该属性为枚举类型，必须和filters搭配使用<br />url: 网页链接 | string(number, string, datetime, order, image, enum, url) | - |
| title | 表格或创建/编辑窗口的数据名称 | string | - |
| visibility | 数据可视性<br />true or all：表格、创建和修改时均可见<br />table：仅在表格中可见<br />edit：仅在编辑时可见<br />modal：仅在创建和编辑时可见<br />object配置见[visibility](#visibility) | bool/string(all, table, modal)/object | - |
| link | 链接配置，见[link](#link) | object | - |
| sort | 排序配置<br />true：支持升序和降序排序<br />asc：支持升序排序<br />desc：支持降序排序<br />object配置见[sort](#sort) | bool/string(asc, desc)/object | - |
| defaultSort | 该属性作为该列表的默认排序及默认排序类型 | string(asc, desc) | - |
| search | 是否支持用该属性模糊搜索 | bool | false |
| imageSize | 图片大小，{width}x{height} | string | 100x100 |
| renderValue | 自定义函数，获取展示值 | Function(value, record) | - |
| filters | 该属性的所有过滤信息，支持函数动态获取，返回格式也需要是object[]，见[filters](#filters)<br />type为DATE或DATETIME的时候为预设的date，text为预设按钮的文字，value会经过moment转换，预设见[antd的DatePicker.RangePicker的ranges](https://ant.design/components/date-picker-cn/#RangePicker)<br />例如：非rangeFilter的fitlers:[{ text: '永久', value: '9999-12-31' }]<br />rangeFilter的fitlers:[{ text: '最近7天', value: [moment.subtract(6, 'days'), moment()] }] | object[]/Function(currentFiler) | [] |
| rangeFilter | 是否范围选择时间，type为DATE或DATETIME起作用 | bool | false |
| canFilter | 是否可以用该属性筛选数据, 关于filter渲染的位置是否在表格里见[filterGroup](#filterGroup) | bool | false |
| filterMultiple | 筛选数据是否可以多选 | bool | false |
| filterTree | 筛选数据是否是树形结构，是的话筛选组件会在表格外 | bool | false |
| mapKey | 如果该属性在排序/筛选/创建/修改/搜索时的key值与数据源内的不同，设置该属性。如果key为array且支持排序/筛选/创建/修改/搜索时该属性必须设置。 | string | - |
| primaryKey | 该属性是否为主键 | bool | flase |
| width | 列宽度 | string/number | '' |
| form | 该属性在表单中的配置，详见[form](#form) | object | '' |
| inlineEdit | STRING类型数据支持行内直接编辑，placeholder和校验沿用form.placeholder和form.rules | bool | false |
| ignoreWhenNotEdit | 为true的时候在修改时不自动回传原始数据，删除数据时删除的是key或key[0]对应的数据 | bool | false |
| multipleEdit | 支持批量修改数据 | bool | false |
| childKey | 关联的子schema的mapKey | string | - |

# form
| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| placeholder | placeholder | string | '' |
| optional | 表单中是否是可选项，不指定则该项在表单中不能为空 | bool | false |
| enable | 表单中是否可见，返回true的时候可见 | Function(formFieldValues, record) | - |
| rules | 在表单中的校验规则，详见[antd的form](https://ant.design/components/form-cn/)的rules | array | [] |
| generateSubmitValue | 支持数据在表单提交之前进行自定义 | Function(value) | - |
| generateInitValue | 支持数据在表单初始化时进行自定义 | Function(value) | - |
| tip | IMAGE类型数据在form中显示的提示 | string | '' |
| enableAdd | ARRAY数据是否可以添加项 | bool | '' |
| arrayGenerateValue | 非字符串ARRAY类型必须要定义此项，返回string类型的新数据值 | Function(preValue, nextValue) | - |
| arrayRenderValue | 非字符串ARRAY类型必须要定义此项，接收的数据是数组里的一项，返回该项在Input组件里的value | Function(value) | - |
| formItemProps | 根据schema的不同type支持antd的不同组件的props。特殊的：enum类型数据详见[selectProps](#selectProps) | object | - |
| bucket | IMAGE类型数据在form中UploadImage用的bucket | string | '' |

# selectProps
支持antd的TreeSelect的除value, onChange, onSearch以外的其他props，详见[antd TreeSelect](https://ant.design/components/tree-select-cn/#Tree-props)。

**注意** v1.4.0以前的如果要升级到v1.4.0以上，如果用到了onSearch注意cb里数据的格式修改（treeData里基本要求key、value、title），此外如果有cb([])的要删除，因为TreeSelect在数据为空以后无法正确显示选中的title。

| 参数 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| onSearch | 当showSearch=true时Select的onSearch会调用此函数。参数：value：同TreeSelect的onSearc(value)的value；formFieldValues：form里的所有field的当前值；cb：回调函数，调用cb(treeData)会重新设置treeData（同antd的TreeSelect的Props里的treeData）。| Function(value, formFieldValues, cb) | () => {} |
| filterOptions | 对treeData进行过滤，返回新的treeData([ { key, children, ...props } ]) | Function(treeData, formFieldValues) | null |

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
| url | 链接的url，如果其中有存在特殊字符的字段（如专辑标题），请用{}包起 | string/Function(record) | - |

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
| default | 默认筛选项  | bool | false |
| disabled | 是否允许筛选该值  | bool | false |

# filterGroup
filterGroup指非表格内筛选的filters，符合以下任一条件的都会渲染在上方：
* type为ColumnTypes.date或ColumnTypes.datetime
* type为ColumnTypes.number
* visibility.table为false

# API要求
* 遵循RESTFUL规范
* 列表返回结果应该包含items和total
* query
    * page：页码
    * pagesize：分页大小
    * filter：筛选条件，decode后值为object，里面每个key/value代表要筛选的条件；支持用%模糊搜索；支持or，其值为obejct，代表满足其中任何一组key/value均可
    * order：排序条件，`${key} ${order}`的形式，其中order取值为asc、desc
