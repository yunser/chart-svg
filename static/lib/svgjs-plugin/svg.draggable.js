/**
 * svg.draggable.js - v17.5.9
 */
;(function() {

    // creates handler, saves it
    function DragHandler(el){
        el.remember('_draggable', this);
        this.el = el
    }

    var fn = DragHandler.prototype;
    
    // Sets new parameter, starts dragging
    fn.init = function(options, val) {
        var _this = this;
        this.options = options;

        // TODO extend
        this.options.grid = options.grid || 1;

        this.value = val;
        this.el.on('mousedown.drag', function(e){ _this.start(e) });
        this.el.on('touchstart.drag', function(e){ _this.start(e) });
    };

    // transforms one point from screen to user coords
    fn.transformPoint = function(event, offset){
        event = event || window.event;
        var touches = event.changedTouches && event.changedTouches[0] || event;
        this.p.x = touches.pageX - (offset || 0);
        this.p.y = touches.pageY;
        return this.p.matrixTransform(this.m);
    };

    // gets elements bounding box with special handling of groups, nested and use
    fn.getBBox = function(){

        var box = this.el.bbox();

        if(this.el instanceof SVG.Nested) box = this.el.rbox();

        if (this.el instanceof SVG.G || this.el instanceof SVG.Use || this.el instanceof SVG.Nested) {
            box.x = this.el.x();
            box.y = this.el.y()
        }

        return box;
    };

    // start dragging
    fn.start = function(e){
        // check for left button
        if(e.type == 'click'|| e.type == 'mousedown' || e.type == 'mousemove'){
            if((e.which || e.buttons) != 1){
                return
            }
        }

        var _this = this;

        // fire beforedrag event
        this.el.fire('beforedrag', { event: e, handler: this });

        // search for parent on the fly to make sure we can call
        // draggable() even when element is not in the dom currently
        this.parent = this.parent || this.el.parent(SVG.Nested) || this.el.parent(SVG.Doc);
        this.p = this.parent.node.createSVGPoint();

        // save current transformation matrix
        this.m = this.el.node.getScreenCTM().inverse();

        var box = this.getBBox();

        var anchorOffset;

        // fix text-anchor in text-element (#37)
        if (this.el instanceof SVG.Text){
            anchorOffset = this.el.node.getComputedTextLength();

            switch(this.el.attr('text-anchor')){
                case 'middle':
                    anchorOffset /= 2;
                    break;
                case 'start':
                    anchorOffset = 0;
                    break;
            }
        }

        this.startPoints = {
            // We take absolute coordinates since we are just using a delta here
            point: this.transformPoint(e, anchorOffset), // 开始坐标
            box: box,
            transform: this.el.transform()
        };

        // add drag and end events to window
        SVG.on(window, 'mousemove.drag', function(e){ _this.drag(e) });
        SVG.on(window, 'touchmove.drag', function(e){ _this.drag(e) });
        SVG.on(window, 'mouseup.drag', function(e){ _this.end(e) });
        SVG.on(window, 'touchend.drag', function(e){ _this.end(e) });

        // fire dragstart event
        this.el.fire('dragstart', {event: e, p: this.startPoints.point, m: this.m, handler: this});

        // prevent browser drag behavior
        e.preventDefault();

        // prevent propagation to a parent that might also have dragging enabled
        e.stopPropagation();
    };

    // while dragging
    fn.drag = function(e) {

        var box = this.getBBox()
            , p   = this.transformPoint(e)
            , x   = this.startPoints.box.x + p.x - this.startPoints.point.x
            , y   = this.startPoints.box.y + p.y - this.startPoints.point.y
            , c   = this.options
            , gx  = p.x - this.startPoints.point.x // 水平位移
            , gy  = p.y - this.startPoints.point.y; // 垂直位移

        var event = new CustomEvent('dragmove', {
            detail: {
                event: e,
                p: p,
                m: this.m,
                handler: this,
                gx: gx,
                gy: gy
            }
            , cancelable: true
        });

        this.el.fire(event);

        if (event.defaultPrevented) {
            return p;
        }

        // move the element to its new position, if possible by options
        if (typeof c == 'function') {

            var coord = c.call(this.el, x, y, this.m);

            // bool, just show us if movement is allowed or not
            if (typeof coord == 'boolean') {
                coord = {
                    x: coord,
                    y: coord
                }
            }

            // if true, we just move. If !false its a number and we move it there
            if (coord.x === true) {
                this.el.x(x)
            } else if (coord.x !== false) {
                this.el.x(coord.x)
            }

            if (coord.y === true) {
                this.el.y(y)
            } else if (coord.y !== false) {
                this.el.y(coord.y)
            }

        } else if (typeof c == 'object') {
            if (e.shiftKey) {
                // 吸附到网格
                x = this.snapGrid(x);
                y = this.snapGrid(y);
                gx = this.snapGrid(gx);
                gy = this.snapGrid(gy);
            }

            // 限制元素位置
            if (c.minX != null && x < c.minX)
                x = c.minX;
            else if (c.maxX != null && x > c.maxX - box.width){
                x = c.maxX - box.width
            }if (c.minY != null && y < c.minY)
                y = c.minY;
            else if (c.maxY != null && y > c.maxY - box.height)
                y = c.maxY - box.height;

            function moveGroup(group) {
                group.each(function(i, children) {
                    if (this instanceof SVG.G) {
                        moveGroup(this);
                    } else {
                        var bbox;
                        if (this instanceof SVG.Text) {
                            if (this.originalBox) {
                                bbox = this.originalBox;
                            } else {
                                this.originalBox = {
                                    x: this.attr('x'),
                                    y: this.attr('y')
                                };
                                bbox = this.originalBox;
                            }
                            this.attr('x', bbox.x + gx).attr('y', bbox.y + gy);
                        } else {
                            if (this.originalBox) {
                                bbox = this.originalBox;
                            } else {
                                this.originalBox = this.bbox();
                                bbox = this.originalBox;
                            }
                            //this.move(this.startPoints.point.x - )
                            this.move(bbox.x + gx, bbox.y + gy);
                            //this.fill({ color: '#f06' })
                        }
                    }
                }, true);
            }

            if (this.el instanceof SVG.G) {
                // 移动组时，每个子元素都移动
                /*this.el.each(function(i, children) {
                    this.move(x, y);
                    //this.fill({ color: '#f06' })
                }, true);*/
                moveGroup(this.el);

                this.el.attr('data-asd', new Date().getTime());
                //this.el.matrix(this.startPoints.transform).transform({x:gx, y: gy}, true);
            }
            else {
                this.el.move(x, y);
            }
        }

        // so we can use it in the end-method, too
        return p;
    };

    fn.snapGrid = function (x) {
        return Math.round(x / this.options.grid) * this.options.grid;
    };

    fn.end = function(e){

        // final drag
        var p = this.drag(e);

        function clearGroup(group) {
            group.each(function (i, index) {
                if (this instanceof SVG.G) {
                    clearGroup(this);
                } else {
                    this.originalBox = null;
                }
            });
        }

        if (this.el instanceof SVG.G) {
            clearGroup(this.el);
        }

        // fire dragend event
        this.el.fire('dragend', { event: e, p: p, m: this.m, handler: this })

        // unbind events
        SVG.off(window, 'mousemove.drag');
        SVG.off(window, 'touchmove.drag');
        SVG.off(window, 'mouseup.drag');
        SVG.off(window, 'touchend.drag');
    };

    SVG.extend(SVG.Element, {
        // Make element draggable
        // Constraint might be an object (as described in readme.md) or a function in the form "function (x, y)" that gets called before every move.
        // The function can return a boolean or an object of the form {x, y}, to which the element will be moved. "False" skips moving, true moves to raw x, y.
        draggable: function(value, options) {

            // Check the parameters and reassign if needed
            if (typeof value == 'function' || typeof value == 'object') {
                options = value;
                value = true
            }

            var dragHandler = this.remember('_draggable') || new DragHandler(this);

            // When no parameter is given, value is true
            value = typeof value === 'undefined' ? true : value;

            if(value) dragHandler.init(options || {}, value);
            else {
                this.off('mousedown.drag');
                this.off('touchstart.drag')
            }

            return this;
        }

    })
    
}).call(this);