/**
 * Created by cjh1 on 2017/4/30.
 */
;(function ($) {
    // drag and drop plugin
    function Dragdrop(elem, option) {
        var that = this;
        var DEFAULTS = {
            drop: function (x, y) {}
        };
        that.opts = $.extend({}, DEFAULTS, option);
        that.$elem = $(elem);
        //that.$elem.hide();

        var down = false;
        var $drag = $('#drag');
        var move = false;
        var over = false;
        var dragelem;
        that.$elem.on('mousedown', 'li', function (e) {
            down = true;
            dragelem = this;
        });
        $(document).on('mousemove', function (e) {
            if (!down) {
                return;
            }
            if (!move) {
                $drag.show();
                move = true;
            }

            $drag.css({
                top: e.clientY,
                left: e.clientX
            })
        });
        $(document).on('mouseup', function (e) {
            if (down) {
                down = false;
                move = false;
                $drag.hide();

                if (over) {
                    // 回调

                }

                that.opts.drop(dragelem, e);
            }
        });
        $('#svg').on('mouseenter', function (e) {
            if (down) {
                over = true;
            }
        });
        $('#svg').on('mouseleave', function (e) {
            if (down) {
                over = false;
            }
        });
        $('#svg').on('mousemove', function (e) {
            if (down) {
            }
        });
    }

    function Plugin(options) {
        $(this).each(function () {
            new Dragdrop(this, options);
        });
    }

    $.fn.dragdrop = Plugin;
})(jQuery);