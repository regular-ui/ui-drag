import {_} from 'rgui-base';

Object.assign(_.dom, {
    getPosition(elem) {
        let doc = elem && elem.ownerDocument,
            docElem = doc.documentElement,
            body = doc.body;

        let box = elem.getBoundingClientRect ? elem.getBoundingClientRect() : {top: 0, left: 0};

        let clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0;

        return {top: box.top - clientTop, left: box.left - clientLeft};
    },
    getSize(elem) {
        return {width: elem.clientWidth, height: elem.clientHeight}
    },
    getDimension(elem, fixed) {
        return Object.assign(this.getSize(elem), this.getPosition(elem, fixed));
    },
    isInRect(position, dimension) {
        if(!position || !dimension)
            return false;

        return position.left > dimension.left
            && (position.left < dimension.left + dimension.width)
            && position.top > dimension.top
            && (position.top < dimension.top + dimension.height);
    },
    getComputedStyle(elem, property) {
        let computedStyle = elem.currentStyle || window.getComputedStyle(elem, null);
        return property ? computedStyle[property] : computedStyle;
    }
});

let manager = {
    dragging: false,
    value: undefined,
    proxy: undefined,
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    startX: 0,
    startY: 0,
    dragX: 0,
    dragY: 0,
    startLeft: 0,
    startTop: 0,
    dragLeft: 0,
    dragTop: 0,
    droppable: undefined,
    droppables: []
}

export default manager;
