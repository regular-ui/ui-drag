## 案例
### 可拖动的弹窗

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={visible = true}>显示弹窗</button>
<div class="m-modal" r-hide={!visible}>
    <div class="modal_dialog" ref="modalDialog">
        <draggable proxy={this.$refs.modalDialog}>
        <div class="modal_hd">
            <a class="modal_close" on-click={visible = false}><i class="u-icon u-icon-close"></i></a>
            <h3 class="modal_title">提示</h3>
        </div>
        </draggable>
        <div class="modal_bd">请拖动标题栏</div>
        <div class="modal_ft">
            <button class="u-btn u-btn-primary" on-click={visible = false}>确定</button>
        </div>
    </div>
</div>
```

```javascript
let component = new RGUI.Component({
    template,
    data: {visible: false}
});
```

### 拖拽约束

<div class="m-example"></div>

```css
.m-well {position: relative; overflow: hidden; width: 220px; height: 220px; background: #fafafa; border: 1px solid #eee; color: #999; text-align: center;}
.u-ball {position: absolute; left: 100px; top: 100px; width: 20px; height: 20px; border-radius: 100%; background: #00c0ef;}
```

```xml
<div class="g-row">
    <div class="g-col g-col-4">
        <div class="m-well">
            <draggable proxy="self" ref="draggable0"><div class="u-ball"></div></draggable>
            水平约束
        </div>
    </div>
    <div class="g-col g-col-4">
        <div class="m-well">
            <draggable proxy="self" ref="draggable1"><div class="u-ball"></div></draggable>
            垂直约束
        </div>
    </div>
    <div class="g-col g-col-4">
        <div class="m-well">
            <draggable proxy="self" ref="draggable2"><div class="u-ball"></div></draggable>
            45度约束
        </div>
    </div>
</div>
<div class="g-row">
    <div class="g-col g-col-4">
        <div class="m-well">
            <draggable proxy="self" ref="draggable3"><div class="u-ball"></div></draggable>
            范围约束
        </div>
    </div>
    <div class="g-col g-col-4">
        <div class="m-well">
            <draggable proxy="self" ref="draggable4"><div class="u-ball"></div></draggable>
            网格约束
        </div>
    </div>
    <div class="g-col g-col-4">
        <div class="m-well">
            <draggable proxy="self" ref="draggable5"><div class="u-ball" style="left: 160px; top: 120px;"></div></draggable>
            圆约束
        </div>
    </div>
</div>
```

```javascript
let component = new RGUI.Component({
    template,
    init() {
        let free = this.$refs.draggable0.restrict;

        this.$refs.draggable0.restrict = (params) =>
            ({left: params.startLeft + params.dragX, top: params.startTop});
        this.$refs.draggable1.restrict = (params) =>
            ({left: params.startLeft, top: params.startTop + params.dragY});
        this.$refs.draggable2.restrict = (params) => {
            let min = Math.min(params.dragX, params.dragY);
            return {left: params.startLeft + min, top: params.startTop + min};
        };
        this.$refs.draggable3.restrict = (params) => {
            let next = free(params);

            let min = 80, max = 120;
            next.left = Math.min(Math.max(min, next.left), max);
            next.top = Math.min(Math.max(min, next.top), max);

            return next;
        };
        this.$refs.draggable4.restrict = (params) => {
            let next = free(params);

            let grid = 40;
            next.left = Math.round(next.left/grid)*grid;
            next.top = Math.round(next.top/grid)*grid;
            
            return next;
        };
        this.$refs.draggable5.restrict = (params) => {
            let next = free(params);

            let nextNorm = Math.sqrt(next.left*next.left + next.top*next.top);
            let radius = 200;
            next.left *= radius/nextNorm;
            next.top *= radius/nextNorm;
            
            return next;
        };
    }
});
```
