## 示例
### 基本形式

<div class="m-example"></div>

```xml
<draggable><div class="u-color u-color-primary">拖我</div></draggable>
```

### 移动自身

如果DOM元素的CSS属性`position`默认为`static`，则在拖拽时会自动设置为`relative`。

<div class="m-example"></div>

```xml
<draggable proxy="self"><div class="u-color u-color-info">自身</div></draggable>
```

### 设置代理

<div class="m-example"></div>

```xml
<draggable>
    <div class="u-color u-color-primary">拖我</div>
    <draggable.proxy>
        <div class="u-color u-color-warning">代理</div>
    </draggable.proxy>
</draggable>
```

### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<draggable
    on-dragstart={console.log('on-dragstart:', '$event:', $event)}
    on-dragend={console.log('on-dragend:', '$event:', $event)}>
    <div class="u-color u-color-primary">拖我</div>
</draggable>
```
