
;(function ($) {
    // 画七巧板
    SVGEditor.prototype.drawQiqiao = function () {
        var svg = this.svg;

        var group = svg.group();
        group.polygon('0,0 100,100 0,200').fill('#69bfd0').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 大三角
        group.polygon('0,0 200,0 100,100').fill('#ccfe67').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 大三角
        group.polygon('200,0 200,100 150,150 150,50').fill('#f33d65').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 平行四边形
        group.polygon('150,50 150,150 100,100').fill('#faf61b').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 小三角
        group.polygon('100,100 150,150 100,200 50,150').fill('#a594c0').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 正方形
        group.polygon('50,150 100,200 0,200').fill('#f78fce').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 小三角
        group.polygon('200,100 200,200 100,200').fill('#f6c928').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 中三角
    };

    // 画现代七巧板
    SVGEditor.prototype.drawModernQiqiao = function () {
        var svg = this.svg;

        var group = svg.group();

        var size = 100;
        // 圆
        group.circle(size).center(size * 1.5, size / 2).fill('#69bfd0').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable');
        // 不规则图形
        var path = 'M ' + (1.5 * size) + ' 0 L ' + ((1.5 + 2 * Math.sqrt(2)) * size)
            + ' 0 L ' + ((0.5 + 2 * Math.sqrt(2)) * size) + ' ' + size
            + ' L ' + (1.5 * size) + ' ' + size
            + ' A ' + (size / 2) + ' ' + (size / 2) + ' 1 1 0 ' + (size * 1.5) + ' 0'
            + ' Z';
        group.path(path).fill('#ccfe67').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable');
        // 梯形
        var points = [
            [(1.5 + 2 * Math.sqrt(2)) * size, 0],
            [(0.5 + 2 * Math.sqrt(2)) * size, size],
            [(0.5 + 3 * Math.sqrt(2)) * size, size],
            [(1.5 + 2.5 * Math.sqrt(2)) * size, (0.5 * Math.sqrt(2)) * size]
        ];
        group.polygon(points).fill('#f33d65').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable');
        //
        points = [
            [(1.5 + 2 * Math.sqrt(2)) * size, 0],
            [(1.5 + 4 * Math.sqrt(2)) * size, 0],
            [(0.5 + 4 * Math.sqrt(2)) * size, size],
            [(0.5 + 3 * Math.sqrt(2)) * size, size],
            [(1.5 + 2.5 * Math.sqrt(2)) * size, (0.5 * Math.sqrt(2)) * size]
        ];
        group.polygon(points).fill('#faf61b').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable');
        // 三角
        points = [
            [(1.5 + 4 * Math.sqrt(2)) * size, 0],
            [(1.5 + 4 * Math.sqrt(2)) * size, size],
            [(0.5 + 4 * Math.sqrt(2)) * size, size, size]
        ];
        group.polygon(points).fill('#a594c0').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable');
        // 半圆
        path = 'M ' + (0.5 * size) + ' 0'
            + ' A ' + (size / 2) + ' ' + (size / 2) + ' 1 1 0 ' + (size * 0.5) + ' ' + size
            + ' Z';
        group.path(path).fill('#f78fce').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable');
        // 半圆
        path = 'M ' + (0.5 * size) + ' 0'
            + ' A ' + (size / 2) + ' ' + (size / 2) + ' 1 1 1 ' + (size * 0.5) + ' ' + size
            + ' Z';
        group.path(path).fill('#f6c928').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable');
    };

    // 等边七巧板
    SVGEditor.prototype.drawQiqiao3 = function () {
        var svg = this.svg;

        var group = svg.group();
        group.polygon('0,0 100,0 0,100').fill('#69bfd0').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 大三角
        group.polygon('100,0 200,0 200,100').fill('#ccfe67').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 大三角
        group.polygon('50,50 100,0 200,100 200,200').fill('#f33d65').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 平行四边形
        group.polygon('0,100 50,50 100,100 0,200').fill('#faf61b').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 小三角
        group.polygon('0,200 50,150 50,250 0,250').fill('#a594c0').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 正方形
        group.polygon('50,150 100,100 150,150 150,250, 50,250').fill('#f78fce').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 小三角
        group.polygon('150,150 200,200 200,250 150,250').fill('#f6c928').stroke({ width: 1 }).addClass('elem elem-draggable elem-rotateable'); // 中三角
    };
})(jQuery);


$(function () {
    var et = new SVGEditor('svg', {
        width: 750,
        height: 500
    });
    //et.drawQiqiao3();
    //et.drawModernQiqiao();

    // 重新开始
    $('#restart').on('click', function () {
        //et.clear();
        et.drawQiqiao();
    });

    $('#modern-tangram').on('click', function () {
        //et.clear();
        et.drawModernQiqiao();
    });

    $('#tangram3').on('click', function () {
        //et.clear();
        et.drawQiqiao3();
    });

    $('#flip-x').on('click', function () {
        et.flipXElem();
    });

    $('#clear').on('click', function () {
        et.clear();
    });

    $('#type-list').selectable({
        item: '.btn'
    });

    $('#example').on('click', function () {
        eui.frame('qiqiao_help.html', {
            size: ['300px', '300px'],
            position: {
                x: 'leftEdge',
                y: 'bottomEdge'
            }
        });
    });

    $('#select').on('click', function () {
        if ($(this).hasClass('active')) {
            et.cancelSelect();
        } else {
            et.setMode(SVGEditor.TYPE_SELECT);
        }
    });

    $('#drag-svg').on('click', function () {
        et.setMode(SVGEditor.TYPE_DRAG);
    });

    document.onselectstart=new Function("event.returnValue=false;"); // TODO 重构
});
