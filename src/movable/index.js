import Draggable from '../draggable';
import manager from '../manager';
import { dom } from 'regularjs';

/**
 * @class Movable
 * @extends Draggable
 * @param {Object}                  options.data                     =  绑定属性
 * @param {string|Dragable.Proxy|Element|function='self'}  options.data.proxy  @=> 拖拽代理，即拖拽时移动的元素。默认值为`clone`，表示拖拽时会拖起自身的一个拷贝；当值为`self`，拖拽时直接拖起自身。也可以用`<draggable.proxy>`自定义代理，或直接传入一个元素或函数。`''`表示不使用拖拽代理。
 * @param {string='both'}           options.data.axis                => 拖拽代理移动时限制的轴向，`both`表示可以在任意方向上移动，`horizontal`表示限制在水平方向上移动，`vertical`表示限制在垂直方向上移动。
 * @param {Object={x:0,y:0}}        options.data.grid                => 拖拽代理移动时限制的网格。值为一个{x,y}格式的对象，表示水平方向和垂直方向网格的大小。
 * @param {string|object|function}  options.data.range              @=> 拖拽范围。值可以为一个{left,top,right,bottom}格式的对象，表示代理元素移动的上下左右边界，也可以传一个函数。当值为`offsetParent`，代理元素限制在offsetParent中移动，仅适用于`position`为`absolute`的情况；当值为`parent`；当值为`window`时，拖拽时代理元素限制在window中移动，仅适用于`position`为`fixed`的情况。
 * @param {string=inside}           options.data.rangeMode           => 拖拽范围模式，默认为`inside`，表示在拖拽范围内侧移动，`center`表示在拖拽范围边缘及内侧移动。
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {string='z-draggable'}    options.data.class               => 可拖拽时（即disabled=false）给该元素附加此class
 * @param {string='z-dragSource'}   options.data.sourceClass         => 拖拽时给起始元素附加此class
 * @param {string='z-dragProxy'}    options.data.proxyClass          => 拖拽时给代理元素附加此class
 */
const Movable = Draggable.extend({
    name: 'movable',
    template: '{#inc this.$body}',
    /**
     * @protected
     * @override
     */
    config() {
        this.defaults({
            proxy: 'self',
            // value: undefined,
            // 'class': 'z-draggable',
            // sourceClass: 'z-dragSource',
            // proxyClass: 'z-dragProxy'
            axis: 'both',
            grid: { x: 0, y: 0 },
            range: undefined,
            rangeMode: 'inside',
            // snap
        });
        this.supr();
    },
    /**
     * @method _getRange(proxy) 获取拖拽范围
     * @private
     * @param  {Element} proxy 拖拽代理元素
     * @return {Element} 拖拽范围元素
     */
    _getRange(proxy) {
        let range;

        if (typeof this.data.range === 'object')
            range = this.data.range;
        else if (typeof this.data.range === 'function')
            range = this.data.range();
        else if (this.data.range === 'offsetParent') {
            if (dom.getComputedStyle(proxy, 'position') !== 'absolute')
                proxy.style.position = 'absolute';

            const offsetParent = proxy.offsetParent;
            range = Object.assign({ left: 0, top: 0 }, dom.getSize(offsetParent, this.data.rangeMode));
        } else if (this.data.range === 'window') {
            if (dom.getComputedStyle(proxy, 'position') !== 'fixed')
                proxy.style.position = 'fixed';

            range = { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        }

        if (range) {
            if (range.width !== undefined && range.height !== undefined) {
                range.right = range.left + range.width;
                range.bottom = range.top + range.height;
            } else if (range.right !== undefined && range.bottom !== undefined) {
                range.width = range.right - range.left;
                range.height = range.bottom - range.top;
            }
        }

        return range;
    },
    /**
     * @method _onMouseMoveStart(e) 处理第一次鼠标移动事件
     * @private
     * @override
     * @param  {MouseEvent} e 鼠标事件
     * @return {void}
     */
    _onMouseMoveStart(e) {
        this.supr(e, true);
        if (manager.proxy)
            manager.range = this._getRange(manager.proxy);
        this._dragStart();
    },
    /**
     * @protected
     * @override
     */
    restrict(params) {
        const next = this.supr(params);

        // 范围约束
        if (params.range) {
            if (this.data.rangeMode === 'inside') {
                const minTop = params.range.bottom - manager.proxy.offsetHeight;
                const minLeft = params.range.right - manager.proxy.offsetWidth;
                next.left = Math.min(Math.max(params.range.left, next.left), minLeft < 0 ? 0 : minLeft);
                next.top = Math.min(Math.max(params.range.top, next.top), minTop < 0 ? 0 : minTop);
            } else if (this.data.rangeMode === 'center') {
                next.left = Math.min(Math.max(params.range.left, next.left), params.range.right);
                next.top = Math.min(Math.max(params.range.top, next.top), params.range.bottom);
            } else if (this.data.rangeMode === 'outside') {
                next.left = Math.min(Math.max(params.range.left - manager.proxy.offsetWidth, next.left), params.range.right);
                next.top = Math.min(Math.max(params.range.top - manager.proxy.offsetHeight, next.top), params.range.bottom);
            }
        }

        // 网格约束
        const grid = this.data.grid;
        grid.x && (next.left = Math.round(next.left/grid.x)*grid.x);
        grid.y && (next.top = Math.round(next.top/grid.y)*grid.y);

        // 轴向约束
        if (this.data.axis === 'vertical')
            next.left = params.startLeft;
        if (this.data.axis === 'horizontal')
            next.top = params.startTop;

        return next;
    },
});

export default Movable;
