## 示例
### 基本形式

<div class="m-example"></div>

```xml
<movable><div class="u-color u-color-primary">拖我</div></movable>
```

### 轴向约束

<div class="m-example"></div>

```xml
<movable axis="horizontal"><div class="u-color u-color-info">水平</div></movable>
<movable axis="vertical"><div class="u-color u-color-warning">垂直</div></movable>
```

### 网格约束

<div class="m-example"></div>

```xml
<movable grid={ { x: 40, y: 30 } }><div class="u-color u-color-success">网格</div></movable>
```

### 范围约束

<div class="m-example"></div>

```css
.m-well {display: inline-block; vertical-align: bottom; width: 300px; height: 300px; padding: 20px; background: #f4f4f4; border: 4px solid #ccc; position: relative;}
.m-well .u-color {border: 2px solid black;}
```

```xml
<div class="m-well">
    <movable range={ { left: 0, top: 0, right: 200, bottom: 200 } }><div class="u-color u-color-info">object</div></movable>
</div>
<div class="m-well">
    <movable range="offsetParent"><div class="u-color u-color-info" style="position: absolute;">offsetParent</div></movable>
</div>
```

### 范围约束模式

<div class="m-example"></div>

```xml
<div class="m-well">
    <movable range="offsetParent" rangeMode="inside"><div class="u-color u-color-info" style="position: absolute;">inside</div></movable>
</div>
<div class="m-well">
    <movable range="offsetParent" rangeMode="none"><div class="u-color u-color-info" style="position: absolute;">none</div></movable>
</div>
```
