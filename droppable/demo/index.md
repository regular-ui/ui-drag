## 示例
### 基本形式

<div class="m-example"></div>

```xml
<draggable value="success"><div class="u-color u-color-success">拖我</div></draggable>
<draggable value="warning"><div class="u-color u-color-warning">拖我</div></draggable>
<draggable value="error"><div class="u-color u-color-error">拖我</div></draggable>
<p></p>
<droppable value={dropData}><div class="u-color u-color-{dropData || 'primary'}">放到这里</div></droppable>
```

### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<draggable value="success"
    on-dragstart={console.log('on-dragstart:', '$event:', $event)}
    on-dragend={console.log('on-dragend:', '$event:', $event)}>
    <div class="u-color u-color-success">拖我</div>
</draggable>
<droppable value={dropData}
    on-dragenter={console.log('on-dragenter:', '$event:', $event)}
    on-dragleave={console.log('on-dragleave:', '$event:', $event)}
    on-drop={console.log('on-drop:', '$event:', $event)}>
    <div class="u-color u-color-{dropData || 'primary'}">放到这里</div>
</droppable>
```
