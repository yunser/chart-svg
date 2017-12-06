/**
 * svg.js 插件 v17.5.11
 * 每个插件相互独立
 */
// 选择插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    var startX, startY;
    var drawingElem = null;
    var selecting = false;
    var down = false;
    var enter = false;
    var curEnterElem = null;

    var start = true;
    SVGEditor.addPlugin({
        type: typeId,
        name: 'select',
        init: function () {
            var that = this;

            function eneterElem(elem) {
                var rbox = that.rbox(elem);
                //console.log(rbox);
                /*that.hoverElem = that.tmpElem
                 .rect(rbox.width, rbox.height)
                 .move(rbox.x, rbox.y)
                 .fill('none')
                 .stroke('#000');*/
                var ctx = that.frontCanvas.getContext('2d');
                ctx.clearRect(0, 0, that.width0, that.height0);
                var rbox = that.rbox(elem);
                ctx.beginPath();
                if (elem instanceof SVG.Rect) {
                    //ctx.rect(elem.attr('x'), elem.attr('y'), elem.attr('width'), elem.attr('height'));

                }
                ctx.arc(rbox.x + rbox.width / 2, rbox.y + rbox.height / 2, 2, 0, Math.PI * 2);
                ctx.stroke();
                //ctx.fill();
            }

            function leaveElem(elem) {
                /*that.hoverElem.remove();*/

                var ctx = that.frontCanvas.getContext('2d');
                ctx.clearRect(0, 0, that.width0, that.height0);
            }

            that.handlers[typeId] = {
                elemClick: function (e, elem) {
                    /*var svgElem = SVG.adopt(elem);
                     if (elem instanceof SVG.Text) {
                     elem.move(0, 0);
                     }*/

                    if (e.altKey) {
                        // 按住 Shift 拖拽复制
                        var svgElem = SVG.adopt(elem);
                        var clone = svgElem.clone();
                        that.selectElem(clone, e.shiftKey);
                    } else {
                        var svgElem = SVG.adopt(elem);
                        that.select(svgElem, e.shiftKey);
                    }
                },
                mousedown: function (x, y, e) {
                    startX = x;
                    startY = y;

                    down = true;
                    if (e.srcElement.id === 'svg') {
                        selecting = true;
                    }
                },
                mousemove: function (x, y, e) {
                    if (!down) {

                        that.eachAllElem(function (elem) {
                            //defs
                            var rbox = that.rbox(elem);

                            if (x >= rbox.x && y >= rbox.y && x <= (rbox.x + rbox.width) && y <= (rbox.y + rbox.height)) {
                                if (!curEnterElem && curEnterElem !== elem) {
                                    curEnterElem = elem;
                                    eneterElem(elem);
                                }
                            } else {
                                if (elem === curEnterElem) {
                                    enter = false;
                                    leaveElem(elem);
                                    curEnterElem = null;
                                }
                            }
                        });
                        return;
                    }

                    if (selecting) {
                        if (!drawingElem) {
                            drawingElem = that.allElem.rect();
                            drawingElem.fill('none').stroke({color: '#666', width: 1}).attr('stroke-dasharray', '3,3');
                            drawingElem.draw(e);
                        }
                    }
                },
                mouseup: function (x0, y0, e) {
                    down = false;

                    if (!drawingElem) {
                        return;
                    }

                    selecting = false;

                    drawingElem.remove();
                    drawingElem = null;

                    var x = Math.min(startX, x0);
                    var y = Math.min(startY, y0);
                    var w = Math.abs(startX - x0);
                    var h = Math.abs(startY - y0);

                    that.eachAllElem(function (elem) {
                        //defs
                        var rbox = that.rbox(elem);

                        var left = rbox.x;
                        var top = rbox.y;
                        var width = rbox.width;
                        var height = rbox.height;
                        var xx = Math.abs((x + w / 2) - (left + width / 2));
                        var yy = Math.abs((y + h / 2)  - (top + height / 2));

                        if ((xx < (w / 2 + width / 2)) && (yy < (h / 2 + height / 2))) {
                            that.selectElem(elem, true);
                        } else {
                            that.pureUnselectize(elem);
                        }
                    });
                }
            };
        }
    });
})(jQuery);

// 直线插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    var drawingElem;
    var startX, startY;

    SVGEditor.addPlugin({
        type: typeId,
        name: 'line',
        init: function () {
            var that = this;

            that.handlers[typeId] = {
                select: function () {
                    that.unselectAllElem();
                },
                mousedown: function (x, y, e) {
                    startX = x;
                    startY = y;
                    drawingElem = that.allElem.line(0, 0, 10, 10);
                    that.styleElem(drawingElem);
                    drawingElem.draw(e, {snapToGrid: 1});
                    that.showTip();
                },
                mousemove: function (x, y, e) {
                    var content = '<div>X: ' + x + '</div><div>Y: ' + y + '</div>';
                    that.tip(content, e.clientX + 8, e.clientY + 8);
                },
                mouseup: function (x, y, e) {
                    that.hideTip();
                    if (Math.abs(startX - x) < 2 && Math.abs(startY - y) < 2) {
                        drawingElem.remove();
                        ui.msg('拖动鼠标可以绘制直线');
                    } else {
                        that.selectElem(drawingElem);

                        that.usePlugin('select');
                        $('#type-list-box').find('.active').removeClass('active');
                        $('[data-type="select"]').addClass('active');
                    }
                }
            };
        }
    });
})(jQuery);

// 矩形插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    var drawingElem;
    var startX, startY;

    SVGEditor.addPlugin({
        type: typeId,
        name: 'rect',
        init: function () {
            var that = this;

            that.handlers[typeId] = {
                select: function () {
                    that.unselectAllElem();
                },
                mousedown: function (x, y, e) {
                    startX = x;
                    startY = y;
                    drawingElem = that.allElem.rect();
                    that.styleElem(drawingElem);
                    drawingElem.draw(e);
                },
                mouseup: function (x, y, e) {
                    if (Math.abs(startX - x) < 2 && Math.abs(startY - y) < 2) {
                        drawingElem.remove();
                        ui.msg('拖动鼠标可以绘制矩形');
                    } else {
                        that.selectElem(drawingElem);

                        that.usePlugin('select');
                        $('#type-list-box').find('.active').removeClass('active');
                        $('[data-type="select"]').addClass('active');
                    }
                }
            };
        }
    });
})(jQuery);

// 椭圆插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    var drawingElem;
    var startX, startY;

    SVGEditor.addPlugin({
        type: typeId,
        name: 'ellipse',
        init: function () {
            var that = this;

            that.handlers[typeId] = {
                select: function () {
                    that.unselectAllElem();
                },
                mousedown: function (x, y, e) {
                    startX = x;
                    startY = y;
                    drawingElem = that.allElem.ellipse();
                    that.styleElem(drawingElem);
                    drawingElem.draw(e);
                },
                mouseup: function (x, y, e) {
                    if (Math.abs(startX - x) < 2 && Math.abs(startY - y) < 2) {
                        drawingElem.remove();
                        ui.msg('拖动鼠标可以绘制椭圆');
                    } else {
                        that.selectElem(drawingElem);

                        that.usePlugin('select');
                        $('#type-list-box').find('.active').removeClass('active');
                        $('[data-type="select"]').addClass('active');
                    }
                }
            };
        }
    });
})(jQuery);

// 多边形插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    var drawingElem;
    var startX, startY;
    var sides = 6; // 边数

    SVGEditor.addPlugin({
        type: typeId,
        name: 'polygon',
        init: function () {
            var that = this;

            // @param {CanvasRenderingContext2D} ctx
            // @param {Number} xCenter 中心坐标X点
            // @param {Number} yCenter 中心坐标Y点
            // @param {Number} radius 外圆半径
            // @param {Number} sides 多边形边数
            // @param {Number} alpha 角度 默认270度
            // @param {Boolean} arc 是否显示外圆
            function drawPolygons(xCenter, yCenter, radius, sides, alpha, arc) {

                var radAngle = Math.PI * 2 / sides;
                var radAlpha = (alpha != 'undefined') ? alpha * Math.PI / 180 : -Math.PI / 2;

                var xPos = xCenter + Math.cos(radAlpha) * radius;
                var yPos = yCenter + Math.sin(radAlpha) * radius;

                var path = that.allElem.path('M100,100 L200,200').addClass('elem');
                path.M(xPos, yPos);

                for (var i = 1; i <= sides; i++) {
                    var rad = radAngle * i + radAlpha;
                    var xPos = xCenter + Math.cos(rad) * radius;
                    var yPos = yCenter + Math.sin(rad) * radius;
                    path.L(xPos, yPos);
                }

                path.Z();

                var clone = path.clone();
                that.allElem.add(clone);
                clone.move(240, 240).size(160, 160);
                path.remove();

                return clone;
            }

            that.handlers[typeId] = {
                select: function () {
                    that.unselectAllElem();
                },
                mousedown: function (x, y, e) {
                    startX = x;
                    startY = y;
                    drawingElem = drawPolygons(200, 200, 20, sides, 0)
                    drawingElem.move(-10, 10).size(2, 2) // 先隐藏
                    that.styleElem(drawingElem);
                    drawingElem.draw(e);

                    /*ui.prompt({
                     title: '边数',
                     formType: 0, //prompt风格，支持0-2
                     value: '3'
                     }, function(pass, i){

                     //text.plain(pass);
                     ui.close(i)
                     });*/
                },
                mouseup: function (x, y, e) {
                    if (Math.abs(startX - x) < 2 && Math.abs(startY - y) < 2) {
                        drawingElem.remove();
                        ui.msg('拖动鼠标可以绘制多边形');
                    } else {
                        that.selectElem(drawingElem);

                        that.usePlugin('select');
                        $('#type-list-box').find('.active').removeClass('active');
                        $('[data-type="select"]').addClass('active');
                    }
                },
                keydown: function (e) {
                    // 3-9
                    if (e.keyCode >= 51 && e.keyCode <= 57) {
                        sides = e.keyCode - 48; // 边数
                    }
                }
            };
        }
    });
})(jQuery);

// 星形插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    var drawingElem;
    var startX, startY;
    var sides = 6; // 边数

    SVGEditor.addPlugin({
        type: typeId,
        name: 'start',
        init: function () {
            var that = this;

            // @param {CanvasRenderingContext2D} ctx
            // @param {Number} xCenter 中心坐标X点
            // @param {Number} yCenter 中心坐标Y点
            // @param {Number} radius 外圆半径
            // @param {Number} sides 多边形边数
            // @param {Number} sideIndent (0 ~ 1)
            // @param {Number} alpha 角度 默认270度
            // @param {Boolean} arc 是否显示外圆
            function drawStarPolygons(xCenter, yCenter, radius, sides, sideIndent, alpha) {
                var sideIndentRadius = radius * (sideIndent || 0.38);
                var radAngle = alpha ? alpha * Math.PI / 180 : -Math.PI / 2;
                var radAlpha = Math.PI * 2 / sides / 2;

                var xPos = xCenter + Math.cos(radAngle) * radius;
                var yPos = yCenter + Math.sin(radAngle) * radius;

                var path = that.allElem.path().addClass('elem');
                path.M(xPos, yPos);

                for (var i = 1; i <= sides * 2; i++) {
                    var rad = radAlpha * i + radAngle;
                    var len = (i % 2) ? sideIndentRadius : radius;
                    var xPos = xCenter + Math.cos(rad) * len;
                    var yPos = yCenter + Math.sin(rad) * len;

                    path.L(xPos, yPos);
                }
                path.Z();

                var clone = path.clone();
                that.allElem.add(clone);
                clone.move(240, 240).size(160, 160);
                path.remove();

                return clone;
            }

            that.handlers[typeId] = {
                select: function () {
                    that.unselectAllElem();
                },
                mousedown: function (x, y, e) {
                    startX = x;
                    startY = y;
                    drawingElem = drawStarPolygons(200, 200, 20, sides, 0);
                    drawingElem.move(-10, 10).size(2, 2) // 先隐藏
                    that.styleElem(drawingElem);
                    drawingElem.draw(e);
                },
                mouseup: function (x, y, e) {
                    if (Math.abs(startX - x) < 2 && Math.abs(startY - y) < 2) {
                        drawingElem.remove();
                        ui.msg('拖动鼠标可以绘制星形');
                    } else {
                        that.selectElem(drawingElem);

                        that.usePlugin('select');
                        $('#type-list-box').find('.active').removeClass('active');
                        $('[data-type="select"]').addClass('active');
                    }
                },
                keydown: function (e) {
                    // 3-9
                    if (e.keyCode >= 51 && e.keyCode <= 57) {
                        sides = e.keyCode - 48; // 边数
                    }
                }
            };
        }
    });
})(jQuery);

// 格式刷插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    SVGEditor.addPlugin({
        type: typeId,
        name: 'brush',
        init: function () {
            var that = this;

            var brush = {
                fill: '#09c',
                stroke: '#f00',
                strokeWidth: 1
            };

            that.handlers[typeId] = {
                select: function () {
                    if (that.selectedElems.length) {
                        var elem = that.getCurElem();
                        brush.fill = elem.attr('fil');
                    } else {
                        ui.msg('请选择形状后再点击格式刷按钮');
                    }
                },
                elemClick: function (e, elem) {
                    SVG.adopt(elem).attr('fill', brush.fill);
                }
            };
        }
    });
})(jQuery);

// 拖拽插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    SVGEditor.addPlugin({
        type: typeId,
        name: 'drag',
        init: function () {
            var that = this;

            that.handlers[typeId] = {
                mousedown: function (e) {
                    var x = e.clientX - that.offsetX;
                    var y = e.clientY - that.offsetY;
                    x /=  that.scale;
                    y /=  that.scale;

                    that.dragDown = true;
                    that.dragX = x;
                    that.dragY = y;
                    that.startViewbox = that.svg.viewbox();
                },
                mousemove: function (e) {
                    if (that.dragDown) {
                        var x = e.clientX - that.offsetX;
                        var y = e.clientY - that.offsetY;
                        x /=  that.scale;
                        y /=  that.scale;

                        var vx = that.startViewbox.x - (x - that.dragX);
                        var vy =  that.startViewbox.y - (y - that.dragY);
                        that.svg.viewbox(vx, vy,
                                that.startViewbox.width, that.startViewbox.height);

                        that.initBg();
                    }
                },
                mouseup: function () {
                    if (that.dragDown) {
                        that.dragDown = false;
                        that.initBg();
                    }

                }
            };
        }
    });
})(jQuery);

// 取色插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    SVGEditor.addPlugin({
        type: typeId,
        name: 'straw',
        init: function () {
            var that = this;

            that.handlers[typeId] = {
                select: function () {
                    that.unselectAllElem();
                },
                elemClick: function (e, elem) {
                    var fill = SVG.adopt(elem).attr('fill');
                    if (that.getCurElem()) {
                        that.getCurElem().fill(fill);
                    } else {
                        that.fill = fill;
                        $('#editor-fill-color').colorpicker('setValue', fill);
                    }
                }
            };
        }
    });
})(jQuery);

// 直接选择插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    SVGEditor.prototype.pathElem = function (elem) {
        var that = this;
        if (elem instanceof SVG.G) {
            ui.msg('无法编辑组');
            return;
        }

        if (elem instanceof SVG.Path) {
            that.usePlugin('path');
            that.setPenMode(5);
            $('#pen-move').addClass('active');
            that.dealPath(elem);
            $('#type-list-box').find('.active').removeClass('active');
            $('#pen').addClass('active');
        } else {
            var toPath = elem.toPath();
            elem.remove();
            toPath.addClass('elem');

            that.usePlugin('path');
            that.setPenMode(5);
            $('#pen-move').addClass('active');
            that.dealPath(toPath);
            $('#type-list-box').find('.active').removeClass('active');
            $('#pen').addClass('active');

        }
    };

    SVGEditor.addPlugin({
        type: typeId,
        name: 'select2',
        init: function () {
            var that = this;

            that.handlers[typeId] = {
                select: function () {
                    that.unselectAllElem();
                },
                elemClick: function (e, elem) {
                    elem = SVG.adopt(elem);

                    that.pathElem(elem);
                }
            };
        }
    });
})(jQuery);

// 路径编辑插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    function v2 (x, y) {
        return {
            x: x || 0,
            y: y || 0
        };
    }
    v2.add = function (lhs, rhs) {
        return v2(lhs.x + rhs.x, lhs.y + rhs.y);
    };
    v2.sub = function (lhs, rhs) {
        return v2(lhs.x - rhs.x, lhs.y - rhs.y);
    };
    v2.mul = function (v, scaling) {
        return v2(v.x * scaling, v.y * scaling);
    };
    v2.div = function (v, scaling) {
        return v2(v.x / scaling, v.y / scaling);
    };
    v2.lerp = function (from, to, ratio) {
        return v2(from.x + (to.x - from.x) * ratio, from.y + (to.y - from.y) * ratio);
    };
    v2.sqrDistance = function (lhs, rhs) {
        var dx = lhs.x - rhs.x;
        var dy = lhs.y - rhs.y;
        return dx * dx + dy * dy;
    };
    v2.distance = function (lhs, rhs) {
        return Math.sqrt(v2.sqrDistance(lhs, rhs));
    };
    v2.dir = function (lhs, rhs) {
        var len = v2.distance(v2, {x: 0, y: 0});
        return v2(v2.x / len, v2.y / len);
    };

    function Curve (points) {
        this.points = points || [];
    }

    function Bezier () {
        this.start = v2();
        this.end = v2();
        this.startCtrlPoint = v2(); // cp0, cp1
        this.endCtrlPoint = v2();   // cp2, cp3
    }

    // Get point at relative position in curve according to arc length
    // - u [0 .. 1]
    Bezier.prototype.getPointAt = function ( u ) {
        var t = this.getUtoTmapping( u );
        return this.getPoint( t );
    };

    function bezierAt (C1, C2, C3, C4, t) {
        var t1 = 1 - t;
        return C1 * t1 * t1 * t1 +
                C2 * 3 * t1 * t1 * t +
                C3 * 3 * t1 * t * t +
                C4 * t * t * t;
    }

    // Get point at time t
    //  - t [0 .. 1]
    Bezier.prototype.getPoint = function ( t ) {
        var x = bezierAt(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t);
        var y = bezierAt(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);

        return new v2(x, y);
    };

    // Get total curve arc length
    Bezier.prototype.getLength = function () {

        var lengths = this.getLengths();
        return lengths[ lengths.length - 1 ];

    };

    // Get list of cumulative segment lengths
    Bezier.prototype.getLengths = function ( divisions ) {

        if ( ! divisions ) divisions = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions): 200;

        if ( this.cacheArcLengths
                && ( this.cacheArcLengths.length === divisions + 1 )) {
            return this.cacheArcLengths;
        }

        var cache = [];
        var current, last = this.getPoint( 0 );
        var p, sum = 0;

        cache.push( 0 );

        for ( p = 1; p <= divisions; p ++ ) {

            current = this.getPoint ( p / divisions );
            sum += v2.distance(current, last);
            cache.push( sum );
            last = current;

        }

        this.cacheArcLengths = cache;

        return cache; // { sums: cache, sum:sum }; Sum is in the last element.
    };

    Bezier.prototype.getUtoTmapping = function ( u, distance ) {

        var arcLengths = this.getLengths();

        var i = 0, il = arcLengths.length;

        var targetArcLength; // The targeted u distance value to get

        if ( distance ) {
            targetArcLength = distance;
        } else {
            targetArcLength = u * arcLengths[ il - 1 ];
        }

        //var time = Date.now();

        // binary search for the index with largest value smaller than target u distance

        var low = 0, high = il - 1, comparison;

        while ( low <= high ) {

            i = Math.floor( low + ( high - low ) / 2 ); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

            comparison = arcLengths[ i ] - targetArcLength;

            if ( comparison < 0 ) {

                low = i + 1;
                continue;

            } else if ( comparison > 0 ) {

                high = i - 1;
                continue;

            } else {

                high = i;
                break;

                // DONE

            }

        }

        i = high;

        if ( arcLengths[ i ] == targetArcLength ) {

            var t = i / ( il - 1 );
            return t;

        }

        // we could get finer grain at lengths, or use simple interpolatation between two points

        var lengthBefore = arcLengths[ i ];
        var lengthAfter = arcLengths[ i + 1 ];

        var segmentLength = lengthAfter - lengthBefore;

        // determine where we are between the 'before' and 'after' points

        var segmentFraction = ( targetArcLength - lengthBefore ) / segmentLength;

        // add that fractional amount to t

        var t = ( i + segmentFraction ) / ( il -1 );

        return t;

    };

    var fn = SVGEditor.prototype;

    fn.drawPathPoint = function () {

    };

    fn.drawCanvas = function (curve) {
        var that = this;

        // RENDERING
        function drawPoint (pos, strokeColor, fillColor, radius) {
            var radius = radius || 12;
            that.tmpElem.circle(radius).center(pos.x, pos.y).fill('#f00');
        }

        function drawLine (from, to) {
            that.tmpElem.line(from.x, from.y, to.x, to.y).stroke('#000');
        }

        // 画贝塞尔曲线
        function drawPath () {
            for (var i = 0; i < curve.points.length; i++) {
                var point = curve.points[i];
                if (i == 0) {
                    that.curPath.M(point.pos.x, point.pos.y);
                } else {
                    var prevPt = curve.points[i - 1];
                    that.curPath.C({x: prevPt.out.x, y: prevPt.out.y},
                            {x: point.in.x, y: point.in.y},
                            {x: point.pos.x, y: point.pos.y});
                }
            }
            if (curve.isClose) {
                var prevPt = curve.points[curve.points.length - 1];
                var pt0 = curve.points[0];
                that.curPath.C({x: prevPt.out.x, y: prevPt.out.y},
                        {x: prevPt.in.x, y: prevPt.in.y},
                        {x: prevPt.pos.x, y: prevPt.pos.y});
                that.curPath.Z();
            }
            that.curPath.redraw();
        }

        that.tmpElem.clear();

        if (!that.curPath) {
            that.curPath = that.allElem.path().stroke({color: '#000', width: 2}).fill('none');
        } else {
            that.curPath.clear();
        }

        drawPath();

        // 绘制节点和控制点
        for (var i = 0; i < curve.points.length; i++) {
            var point = curve.points[i];
            if (point.in) {
                that.tmpElem.line(point.pos.x, point.pos.y, point.in.x, point.in.y).stroke('#999');
                that.tmpElem.circle(4).center(point.in.x, point.in.y).fill('#09c').stroke('#000');
            }
            if (point.out) {
                //drawLine(point.pos, point.out);
                that.tmpElem.line(point.pos.x, point.pos.y, point.out.x, point.out.y).stroke('#999');
                that.tmpElem.circle(4).center(point.out.x, point.out.y).fill('#c90').stroke('#000');
            }
            that.tmpElem.circle(8).center(point.pos.x, point.pos.y).fill('#f00');
        }
    };

    // 这里
    fn.dealPath = function (pathElem) {
        var that = this;

        // path
        var path = pathElem;
        that.curPath = pathElem;
        that.isDealPath = true;

        var arr = path.array().value;
        var r = 8;
        var lastX = 0;
        var lastY = 0;

        var curve = that.curve;
        curve.points = [];

        for (var i = 0; i < arr.length; i++) {
            var pt = arr[i];
            var prePt = (i === 0) ? null : arr[i - 1];
            switch (pt[0]) {
                case 'M':
                case 'm':
                    lastX = pt[1];
                    lastY = pt[2];
                    /*if (curve.points.length > 1) {
                     var prePt = curve.points[curve.points.length - 1];
                     prePt.out = {
                     x: pt[1],
                     y: pt[2]
                     };
                     }*/
                    curve.points.push({
                        in: v2(lastX, lastY),
                        pos: v2(lastX, lastY),
                        out: v2(lastX, lastY)
                    });
                    break;
                case 'L':
                case 'l':
                    lastX = pt[1];
                    lastY = pt[2];

                    var preCurvePt = curve.points[curve.points.length - 1];
                    if (prePt && (prePt[0] === 'c' || prePt[0] === 'C')) {
                        preCurvePt.out = {
                            x: prePt[5],
                            y: prePt[6]
                        };
                    }
                    /*if (curve.points.length > 1) {
                     var prePt = curve.points[curve.points.length - 1];
                     prePt.out = {
                     x: pt[1],
                     y: pt[2]
                     };
                     }*/
                    curve.points.push({
                        in: v2(lastX, lastY),
                        pos: v2(lastX, lastY),
                        out: v2(lastX, lastY)
                    });
                    break;
                case 'H':
                case 'h':
                    lastX = pt[1];
                    curve.points.push({
                        in: v2(lastX, lastY),
                        pos: v2(lastX, lastY),
                        out: v2(lastX, lastY)
                    });
                    //that.svg.circle(r).fill('#f00').move(lastX - r / 2, lastY - r / 2);
                    break;
                case 'V':
                case 'v':
                    lastY = pt[1];
                    curve.points.push({
                        in: v2(lastX, lastY),
                        pos: v2(lastX, lastY),
                        out: v2(lastX, lastY)
                    });
                    //that.svg.circle(r).fill('#f00').move(lastX - r / 2, lastY - r / 2);
                    break;
                case 'C':
                case 'c':
                    // C prevPos.x prevPos.y in.x in.y  pos.x pos.y
                    if (curve.points.length > 1) {
                        var preCurvePt = curve.points[curve.points.length - 1];
                        preCurvePt.out = {
                            x: pt[1],
                            y: pt[2]
                        };
                    }

                    curve.points.push({
                        in: v2(pt[3], pt[4]),
                        pos: v2(pt[5], pt[6]),
                        out: v2(pt[5], pt[6])
                    });
                    /*if (i === arr.length - 1) {

                     } else {
                     curve.points.push({
                     in: v2(pt[3], pt[4]),
                     pos: v2(pt[5], pt[6]),
                     out: v2(pt[1], pt[2])
                     });
                     }*/
                    break;
                case 'S':
                case 's':
                    break;
                case 'Q':
                case 'q':
                    break;
                case 'T':
                case 't':
                    break;
                case 'A':
                case 'a':
                    break;
                case 'Z':
                    curve.isClose = true;
                    break;
            }
        }

        that.drawCanvas(curve);
    };

    SVGEditor.addPlugin({
        type: typeId,
        name: 'path',
        init: function () {
            var that = this;

            function getBezierPos (bezier, progress) {
                var p01 = v2.lerp(bezier.start, bezier.startCtrlPoint, progress);
                var p12 = v2.lerp(bezier.startCtrlPoint, bezier.endCtrlPoint, progress);
                var p23 = v2.lerp(bezier.endCtrlPoint, bezier.end, progress);
                var p012 = v2.lerp(p01, p12, progress);
                var p123 = v2.lerp(p12, p23, progress);
                var p0123 = v2.lerp(p012, p123, progress);
                return p0123;
            }

            var InitPoints = [
                /*{
                 in: v2(80, 100),
                 pos: v2(100, 100),
                 out: v2(120, 100)
                 },
                 {
                 in: v2(100, 200),
                 pos: v2(200, 200),
                 out: v2(300, 200),
                 },
                 {
                 in: v2(300, 100),
                 pos: v2(300, 100),
                 out: v2(400, 100)
                 }*/
            ];

            that.curve = new Curve(InitPoints);
            that.curve.isClose = false;
            var curve = that.curve;

            var MODE_PEN = 1; // 钢笔工具
            var MODE_OP = 2; // 锚点工具
            var MODE_DEL = 3; // 删除锚点工具
            var MODE_ADD = 4; // 添加锚点工具
            var MODE_MOVE = 5; // 移动锚点工具
            that.penMode = MODE_PEN;

            var draggingPts = [];
            var draggingTypes = [];

            var draggingPoint = -1;
            var draggingType = '';
            var drawing = false;
            var isDown = false;

            var SqrHitRadius = Math.pow(9, 2);
            function getMousePos2 (x, y) {
                return v2(x, y);
            }

            function keepSmooth (point, mousePos, oldPos) {
                if (draggingType === 'pos') {
                    var delta = v2.sub(mousePos, oldPos);
                    if (point.in) {
                        point.in = v2.add(point.in, delta);
                    }
                    if (point.out) {
                        point.out = v2.add(point.out, delta);
                    }
                } else {
                    /*var another;
                     var anotherType;
                     if (draggingType === 'in') {
                     anotherType = 'out';
                     }
                     else if (draggingType === 'out') {
                     anotherType = 'in';
                     }
                     another = point[anotherType];
                     if (another) {
                     var dir = v2.sub(point.pos, mousePos);
                     var len = v2.distance(mousePos, point.pos);
                     if (len > 0.01) {
                     dir = v2.div(dir, len);
                     var anotherLen = v2.distance(another, point.pos);
                     dir = v2.mul(dir, anotherLen);
                     point[anotherType] = v2.add(dir, point.pos);
                     }
                     }*/
                }
            }

            that.handlers[typeId] = {
                select: function () {
                    $('#pen-tools').show();
                },
                unselect: function () {
                    if (that.curPath) {
                        var clone = that.curPath.clone();
                        that.allElem.add(clone);
                        // TODO
                        clone.addClass('elem elem-resizable');
                        if (curve.isClose && !that.isDealPath) {
                            clone.fill(that.fill)
                                    .stroke({color: that.stroke, width: that.strokeWidth}); // TODO

                        } else {

                        }
                        that.curPath.remove();
                        that.curPath = null;
                    }

                    curve.points = [];
                    curve.isClose = false;
                    that.tmpElem.clear();
                    $('#pen-tools').hide();
                },
                mousedown: function (x, y, e) {
                    isDown = true;
                    startX = x;
                    startY = y;

                    var mousePos = getMousePos2(x, y);

                    // 遍历每一个点
                    for (var i = 0; i < curve.points.length; i++) {
                        var point = curve.points[i];

                        //points.push(bezier.start, bezier.startCtrlPoint, bezier.endCtrlPoint, bezier.end);
                        var dis = v2.sqrDistance(point.pos, mousePos);
                        if (dis < SqrHitRadius) {
                            draggingPoint = i;
                            draggingType = 'pos';

                            draggingPts.push(i);
                            draggingTypes.push('pos');
                            continue;
                        }
                        if (point.in) {
                            dis = v2.sqrDistance(point.in, mousePos);
                            if (dis < SqrHitRadius) {
                                draggingPoint = i;
                                draggingType = 'in';

                                draggingPts.push(i);
                                draggingTypes.push('in');
                                continue;
                            }
                        }
                        if (point.out) {
                            dis = v2.sqrDistance(point.out, mousePos);
                            if (dis < SqrHitRadius) {
                                draggingPoint = i;
                                draggingType = 'out';

                                draggingPts.push(i);
                                draggingTypes.push('out');
                                continue;
                            }
                        }
                    }
                },
                mousemove: function (x, y, e) {
                    if (!isDown) {
                        return;
                    }
                    if (that.penMode === MODE_PEN && drawing) {
                        var points = curve.points;
                        if (points.length) {
                            var prev = points[points.length - 1];

                            that.drawCanvas(curve);
                            //that.tmpElem.line(prev.pos.x, prev.pos.y, x, y).stroke('#000');
                        }
                    }

                    if (draggingType) {

                        if (that.penMode === MODE_MOVE || (that.penMode === MODE_OP && e.shiftKey)) {
                            // 移动锚点
                            var mousePos = getMousePos2(x, y);

                            for (var i = 0; i < draggingPts.length; i++) {
                                var point = curve.points[draggingPts[i]];
                                var oldPos = point[draggingTypes[i]];

                                point[draggingTypes[i]] = mousePos;
                                keepSmooth(point, mousePos, oldPos);
                            }
                            that.drawCanvas(curve);
                        } else if (that.penMode === MODE_OP) {
                            if (draggingType === 'pos') {
                                // 转换锚点
                                var mousePos = getMousePos2(x, y);
                                for (var i = 0; i < draggingPts.length; i++) {
                                    var p = curve.points[draggingPts[i]];
                                    p.out = mousePos;
                                    p.in = v2.add(p.pos, v2.sub(p.pos, p.out));
                                }
                                that.drawCanvas(curve);
                            } else {
                                // 移动控制点
                                var mousePos = getMousePos2(x, y);
                                for (var i = 0; i < draggingPts.length; i++) {
                                    /*var p = curve.points[draggingPts[i]];
                                     p.out = mousePos;
                                     p.in = v2.add(p.pos, v2.sub(p.pos, p.out));*/

                                    var point = curve.points[draggingPts[i]];
                                    var oldPos = point[draggingTypes[i]];
                                    point[draggingTypes[i]] = mousePos;
                                }

                                that.drawCanvas(curve);
                            }
                        }
                    }
                },
                mouseup: function (x, y, e) {
                    if (!isDown) {
                        return;
                    }
                    isDown = false;

                    // 点击转换锚点
                    if (that.penMode === MODE_OP) {
                        if (Math.abs(x - startX) < 4 && Math.abs(y - startY) < 4) { // TODO 允许范围可以大一点
                            if (draggingType === 'pos') {
                                var mousePos = getMousePos2(x, y);
                                var p = curve.points[draggingPoint];
                                p.out = p.pos;
                                p.in = p.pos;
                                that.drawCanvas(curve);
                            } else if (draggingType === 'in') {
                                var mousePos = getMousePos2(x, y);
                                for (var i = 0; i < draggingPts.length; i++) {
                                    var p = curve.points[draggingPts[i]];
                                    p.in = p.pos;
                                }
                                that.drawCanvas(curve);
                            }  else if (draggingType === 'out') {
                                var mousePos = getMousePos2(x, y);
                                for (var i = 0; i < draggingPts.length; i++) {
                                    var p = curve.points[draggingPts[i]];
                                    p.out = p.pos;
                                }
                                that.drawCanvas(curve);
                            }

                        }
                    }

                    // 删除锚点
                    if (that.penMode === MODE_DEL || event.ctrlKey) {
                        if (draggingType) {
                            if (draggingType === 'pos') {
                                for (var i = draggingPts.length - 1; i >= 0; i--) {
                                    curve.points.splice(draggingPts[i], 1);
                                }
                                /*for (var i = 0; i < draggingPts.length; i++) {


                                 }*/
                                that.drawCanvas(curve);
                            } else {
                                ui.msg('请针对路径的描点进行删除描点工具');
                            }
                        }
                    }

                    // 添加锚点
                    if (that.penMode === MODE_ADD || event.shiftKey) {
                        var points = curve.points;
                        if (points.length === 0) {
                            that.isDealPath = false;
                        }
                        if (points.length > 1) {
                            var prev = points[points.length - 1];
                            prev.out = v2.add(prev.pos, v2.sub(prev.pos, prev.in));
                        }
                        var newPos = getMousePos2(x, y);
                        curve.points.push({
                            pos: newPos,
                            //in: v2.lerp(newPos, prev.out, 0.3)
                            in: newPos,
                            out: newPos
                        });

                        that.drawCanvas(curve);

                        event.stopImmediatePropagation();
                    }

                    // 锚点工具
                    if (that.penMode === MODE_PEN) {

                        var points = curve.points;
                        if (points.length) {
                            var prev = points[points.length - 1];
                            prev.out = v2.add(prev.pos, v2.sub(prev.pos, prev.in));
                        }


                        var newPos = getMousePos2(x, y);

                        // 如果点击第一个点，则闭合路径，否则添加锚点
                        if (draggingPoint === 0 && draggingType === 'pos') {
                            curve.isClose = true;
                            /*curve.points.push({
                             pos: newPos,
                             //in: v2.lerp(newPos, prev.out, 0.3)
                             in: newPos,
                             out: newPos
                             });*/
                        } else {
                            curve.points.push({
                                pos: newPos,
                                //in: v2.lerp(newPos, prev.out, 0.3)
                                in: newPos,
                                out: newPos
                            });
                        }


                        drawing = true;

                        that.drawCanvas(curve);

                        event.stopImmediatePropagation();
                    }

                    if (draggingType) {
                        draggingType = '';
                        draggingPoint = -1;
                        draggingPts = [];
                        draggingTypes = [];
                    }

                }
            };
        }
    });
})(jQuery);

// 连线插件 TODO 预加载
(function ($) {
    var typeId = SVGEditor.getTypeId();

    var fn = SVGEditor.prototype;

    fn.initLineJoin = function () {
        var that = this;

        that.$svg.find('.elem-joinable').each(function () {
            var line = that.get(this);
            var start = SVG.get($(this).attr('lineStart'));
            var end = SVG.get($(this).attr('lineEnd'));

            that.lineJoin(line, start, end);
        });
    };

    fn.lineJoin = function(curLine, startElem, elem2) {
        var that = this;

        curLine.startElem = startElem;
        curLine.endElem = elem2;

        (function (line) {
            startElem.on("ui-change", function() {
                line.update();
            });
            startElem.on("dragend", function() {
                line.update(true);
            });
            startElem.on('remove', function () {
                line.remove();
            });
            elem2.on("ui-change", function() {
                line.update();
            });
            elem2.on("dragend", function() {
                line.update(true);
            });
            elem2.on('remove', function () {
                line.remove();
            });
            line.update = function (end) {
                var startBox = that.rbox(line.startElem);
                var endBox = that.rbox(line.endElem);

                var x1 = startBox.x + startBox.width / 2;
                var y1 = startBox.y + startBox.height / 2;
                var x2 = endBox.x + endBox.width / 2;
                var y2 = endBox.y + endBox.height / 2;

                if (Math.abs(x1 - x2) > Math.abs(y1 - y2)) {

                } else {

                }

                var lineType = line.attr('data-line');
                if (lineType === 'line') {
                    line.plot(x1, y1, x2, y2);
                } else if (lineType === 'curve') {
                    line.plot(curvePath(x1, y1, x2, y2));
                } else {
                    line.plot(polylinePath(x1, y1, x2, y2));
                }

                // 限制线的长度
                //alert(line.attr('max-length'))
                var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                /*if (length > 200 && end) {
                 var k = 200;
                 var t = (y1 - y2) / (x2 - x1);
                 var nx = Math.sqrt((k * k) / (1 + t * t));
                 var ny = t * nx;
                 if (x2 > x1) {
                 nx = x1 + nx;
                 } else {
                 nx = x1 - nx;
                 }
                 if (y1 > y2) {
                 ny = y1 - ny;
                 } else {
                 ny = y1 + ny;
                 }

                 line.plot(x1, y1, nx, ny);
                 console.log(x1,y1,x2,y2,nx, ny);
                 line.endElem.center(nx, ny);
                 }*/

            };
        })(curLine);
    };

    // 绘制曲线
    var curvePath = function (x1, y1, x2, y2) {
        var path;
        if (Math.abs(x1 - x2) > Math.abs(y1, y2)) {
            // 横
            var path = 'M' + x1 + ' ' + y1 + ' C' + ((x1 + x2) / 2) + ' ' + y1 + ' ' + ((x1 + x2) / 2) + ' ' + y2 + ' ' + x2 + ' ' + y2;
        } else {
            // 竖
            path = 'M' + x1 + ' ' + y1 + ' C' + x1 + ' ' + ((y2 + y1) / 2) + ' ' + x2 + ' ' + ((y2 + y1) / 2) + ' ' + x2 + ' ' + y2;
        }
        return path;
    };

    // 绘制折线
    var polylinePath = function (x1, y1, x2, y2) {
        // 横
        var path = 'M' + x1 + ' ' + y1 + ' L' + ((x1 + x2) / 2) + ' ' + y1 + ' ' + ((x1 + x2) / 2) + ' ' + y2 + ' ' + x2 + ' ' + y2;
        // 竖
        var path = 'M' + x1 + ' ' + y1 + ' L' + x1 + ' ' + ((y2 + y1) / 2) + ' ' + x2 + ' ' + ((y2 + y1) / 2) + ' ' + x2 + ' ' + y2;
        return path;
    };

    SVGEditor.addPlugin({
        preload: true,
        type: typeId,
        name: 'join',
        init: function () {
            var that = this;

            that.initLineJoin();

            that.startJoin = false;
            that.curLine;
            that.lineX = 0;
            that.lineY = 0;
            that.lineX2 = 0;
            that.lineY2 = 0;
            that.elem2 = null;
            that.startElem = null;

            that.handlers[typeId] = {
                select: function () {
                    that.unselectAllElem();
                    that.mode = SVGEditor.TYPE_JOIN;
                },
                unselect: function () {
                    that.mode = null;
                },
                elemClick: function (e, elem) {

                }
            };

            that.$svg.on('mouseout', '.elem', function(e) {
                if (that.mode !== SVGEditor.TYPE_JOIN) {
                    return;
                }

                var elem = SVG.adopt(this);
                elem.removeClass('cursor-line');
            });

            that.$svg.on('mouseover', '.elem', function(e) {
                if (that.mode !== SVGEditor.TYPE_JOIN) {
                    return;
                }

                if (!this.id) {
                    this.id = ui.getId();
                }

                var elem = SVG.adopt(this);
                elem.addClass('cursor-line');

                if (that.startJoin) {
                    var box = elem.bbox();
                    var rbox = that.rbox(elem);

                    that.lineX2 = rbox.x + rbox.width / 2;
                    that.lineY2 = rbox.y + rbox.height / 2;
                    that.elem2 = elem;
                }

            });

            that.$svg.on('mousedown', '.elem', function(e) {
                if (that.mode !== SVGEditor.TYPE_JOIN) {
                    return;
                }

                var elem = SVG.adopt(this);
                var box = elem.bbox();

                var rbox = that.rbox(elem);

                that.lineX = rbox.x + rbox.width / 2;
                that.lineY = rbox.y + rbox.height / 2;
                that.startElem = elem;
                that.startJoin = true;
                if (e.shiftKey) {
                    // 直线
                    that.curLine = that.lineElem.line(that.lineX, that.lineY, that.lineX, that.lineY)
                            .fill('#09f')
                            .back().stroke({color: that.stroke, width: that.strokeWidth})
                            .addClass('elem')
                            .addClass('elem-joinable');
                    that.curLine.attr('stroke-dasharray', that.strokeDasharray); // 最后
                    that.curLine.attr('data-line', 'line');
                } else if (e.altKey) {
                    // 折线
                    that.curLine = that.lineElem.path(polylinePath(that.lineX, that.lineY, that.lineX, that.lineY))
                            .fill('none')
                            .back().stroke({color: that.stroke, width: that.strokeWidth})
                            .addClass('elem')
                            .addClass('elem-joinable');
                    that.curLine.attr('stroke-dasharray', that.strokeDasharray); // 最后
                    that.curLine.attr('data-line', 'polyline');
                } else {
                    // 曲线
                    that.curLine = that.lineElem.path(curvePath(that.lineX, that.lineY, that.lineX, that.lineY))
                            .fill('none')
                            .back().stroke({color: that.stroke, width: that.strokeWidth})
                            .addClass('elem')
                            .addClass('elem-joinable');
                    that.curLine.attr('stroke-dasharray', that.strokeDasharray); // 最后
                    that.curLine.attr('data-line', 'curve');
                }

            });

            $(document).on('mousemove', function(e) {
                if (that.mode !== SVGEditor.TYPE_JOIN) {
                    return;
                }

                if (that.startJoin) {
                    var pt = that.getPosition(e);

                    var lineType = that.curLine.attr('data-line');
                    if (lineType === 'line') {
                        that.curLine.plot(that.lineX, that.lineY, pt.x, pt.y);
                    } else if (lineType === 'curve') {
                        that.curLine.plot(curvePath(that.lineX, that.lineY, pt.x, pt.y));
                    } else {
                        that.curLine.plot(polylinePath(that.lineX, that.lineY, pt.x, pt.y));
                    }
                }
            });

            $(document).on('mouseup', function(e) {
                if (that.mode !== SVGEditor.TYPE_JOIN) {
                    return;
                }

                if (that.startJoin) {
                    if (that.elem2) {
                        var lineType = that.curLine.attr('data-line');
                        if (lineType === 'line') {
                            that.curLine.plot(that.lineX, that.lineY, that.lineX2, that.lineY2);
                        } else if (lineType === 'curve') {
                            that.curLine.plot(curvePath(that.lineX, that.lineY, that.lineX2, that.lineY2));
                        } else {
                            that.curLine.plot(polylinePath(that.lineX, that.lineY, that.lineX2, that.lineY2));
                        }

                        that.lineJoin(that.curLine, that.startElem, that.elem2);

                    } else {
                        that.curLine.remove();
                    }

                    that.startJoin = false;
                }

            });
        }
    });

})(jQuery);

// 测距插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    var drawingElem;
    var startX, startY;
    var $tipBox = $('#tip-box');

    function getAngle(x1, y1, x2, y2) {
        // 直角的边长
        var x = Math.abs(x1 - x2);
        var y = Math.abs(y1 - y2);
        // 斜边长
        var z = Math.sqrt(x * x + y * y);
        // 余弦
        var cos = y / z;
        // 弧度
        var radina = Math.acos(cos);
        // 角度
        var angle =  90 - 180 / (Math.PI / radina);
        return angle;
    }

    SVGEditor.addPlugin({
        type: typeId,
        name: 'distance',
        init: function () {
            var that = this;

            that.handlers[typeId] = {
                mousedown: function (x, y, e) {
                    startX = x;
                    startY = y;
                    // TODO 有时线会删除不了
                    if (drawingElem) {
                        drawingElem.move();
                    }
                    drawingElem = that.allElem.line(0, 0, 10, 10);
                    that.styleElem(drawingElem);
                    drawingElem.draw(e, {snapToGrid: 1});

                    $tipBox.show();
                },
                mousemove: function (x, y, e) {
                    $tipBox.css({
                        top: (e.clientY + 8) + 'px',
                        left: (e.clientX + 8) + 'px'
                    });
                    var distance = Math.sqrt(Math.pow(startX - x, 2) + Math.pow(startY - y, 2)).toFixed(1);
                    var angle = getAngle(startX, startY, x, y).toFixed(1);
                    $tipBox.html('<div>长度: ' + distance + '</div><div>角度: ' + angle + '</div>');
                },
                mouseup: function (x, y, e) {
                    $tipBox.hide();
                    if (Math.abs(startX - x) < 2 && Math.abs(startY - y) < 2) {
                        ui.msg('拖动鼠标可以测量距离');
                    }
                    drawingElem.remove();
                    drawingElem = null;
                }
            };
        }
    });
})(jQuery);

// 文字插件
(function ($) {
    var typeId = SVGEditor.getTypeId();

    var drawingElem;
    var startX, startY;

    SVGEditor.addPlugin({
        type: typeId,
        name: 'text',
        init: function () {
            var that = this;

            that.handlers[typeId] = {
                mousedown: function (x, y, e) {
                    startX = x;
                    startY = y;
                    /*drawingElem = that.allElem.line(0, 0, 10, 10);
                     that.styleElem(drawingElem);
                     drawingElem.draw(e, {snapToGrid: 1});
                     that.showTip();*/
                },
                mousemove: function (x, y, e) {
                },
                mouseup: function (x, y, e) {
                    that.allElem.text('双击编辑文字').x(x).y(y)
                            .addClass('elem');
                    that.usePlugin('select');
                }
            };
        }
    });
})(jQuery);