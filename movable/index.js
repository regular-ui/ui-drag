import Draggable from '../draggable';
import manager from '../manager';
import { dom } from 'regularjs';

/**
 * @class Movable
 * @extend Draggable
 * @param {object}                  options.data                     =  绑定属性
 * @param {string|Dragable.Proxy|Element|function='self'}  options.data.proxy  @=> 拖拽代理，即拖拽时移动的元素。默认值为`clone`，表示拖拽时会拖起自身的一个拷贝；当值为`self`，拖拽时直接拖起自身。也可以用`<draggable.proxy>`自定义代理，或直接传入一个元素或函数。`''`表示不使用拖拽代理。
 * @param {string='both'}           options.data.axis                => 拖拽代理移动时限制的轴向，`both`表示可以在任意方向上移动，`horizontal`表示限制在水平方向上移动，`vertical`表示限制在垂直方向上移动。
 * @param {string|object|Element|function} options.data.range       @=> 拖拽范围。值可以为一个{left,top,right,bottom}格式的对象，表示代理元素移动的上下左右边界。当值为`offsetParent`，拖拽时代理元素限制在offsetParent中移动；当值为`parent`；当值为。也可以直接传入一个元素或函数。
 * @param {string=inside}           options.data.rangeMode           => 拖拽范围模式，默认为`inside`，表示在拖拽范围内移动，`none`表示代理元素的left,top直接按拖拽范围计算。
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
        this.data = Object.assign({
            proxy: 'self',
            // value: undefined,
            // 'class': 'z-draggable',
            // sourceClass: 'z-dragSource',
            // proxyClass: 'z-dragProxy'
            axis: 'both',
            range: undefined,
            rangeMode: 'inside',
            // grid
            // snap
        }, this.data);
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
        else if (this.data.range === 'offsetParent') {
            const offsetParent = proxy.offsetParent;
            if (offsetParent)
                range = { left: 0, top: 0, right: offsetParent.offsetWidth, bottom: offsetParent.offsetHeight };
            else
                range = { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };
        } else if (this.data.range === 'parent') {
            const parent = proxy.parentElement;
            if (dom.getComputedStyle(proxy, 'position') === 'fixed') {
                range = dom.getDimension(parent);
                range.right = range.left + range.width;
                range.bottom = range.top + range.height;
            }
        } else if (range instanceof Element) {
            //
        }

        if (range) {
            range.width = range.right - range.left;
            range.height = range.bottom - range.top;
        }

        return range;
    },
    /**
     * @protected
     * @override
     */
    _onMouseMoveStart(e) {
        this.supr(e);

        if (manager.proxy)
            manager.range = this._getRange(manager.proxy);
    },
    /**
     * @protected
     * @override
     */
    restrict(params) {
        const next = this.supr(params);

        if (params.range) {
            if (this.data.rangeMode === 'none') {
                next.left = Math.min(Math.max(params.range.left, next.left), params.range.right);
                next.top = Math.min(Math.max(params.range.top, next.top), params.range.bottom);
            } else if (this.data.rangeMode === 'inside') {
                next.left = Math.min(Math.max(params.range.left, next.left), params.range.right - manager.proxy.offsetWidth);
                next.top = Math.min(Math.max(params.range.top, next.top), params.range.bottom - manager.proxy.offsetHeight);
            }
        }

        if (this.data.grid) {
            // @TODO
        }

        if (this.data.axis === 'vertical')
            next.left = params.startLeft;
        if (this.data.axis === 'horizontal')
            next.top = params.startTop;

        return next;
    },
});

export default Movable;
