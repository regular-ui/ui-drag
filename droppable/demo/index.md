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
