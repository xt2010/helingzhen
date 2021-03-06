!function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return a.returnExportsGlobal = b()
    }) : "object" == typeof exports ? module.exports = b() : a.bouncefix = b()
}(this, function() {
    var a;
    a = function() {
        function a(a, b, c, d) {
            this.el = a,
            this.eventName = b,
            this.handler = c,
            this.context = d,
            this.add()
        }
        return a.prototype._handler = function(a, b) {
            var c = {};
            for (var d in a)
                c[d] = a[d];
            c.stopPropagation = function() {
                a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
            }
            ,
            c.preventDefault = function() {
                a.preventDefault ? a.preventDefault() : a.returnValue = !1
            }
            ,
            this.handler.call(this.context || b, c)
        }
        ,
        a.prototype.add = function() {
            var a = this;
            a.cachedHandler = function(b) {
                a._handler.call(a, b, this)
            }
            ,
            a.el.addEventListener(a.eventName, a.cachedHandler, !1)
        }
        ,
        a.prototype.remove = function() {
            this.el.removeEventListener(this.eventName, this.cachedHandler)
        }
        ,
        a
    }();
    var b;
    b = function() {
        var a = {};
        return a.getTargetedEl = function(a, b) {
            for (; ; ) {
                if (a.classList.contains(b))
                    break;
                if (!(a = a.parentElement))
                    break
            }
            return a
        }
        ,
        a.isScrollable = function(a) {
            return a.scrollHeight > a.offsetHeight
        }
        ,
        a.scrollToEnd = function(a, b) {
            var c = a.scrollTop
              , d = a.offsetHeight
              , e = a.scrollHeight;
            0 >= c && !b && (a.scrollTop = 1),
            c + d >= e && (a.scrollTop = e - d - 1)
        }
        ,
        a
    }();
    var c;
    c = function(a, b) {
        var c = function(b, d) {
            if (!(this instanceof c))
                return new c(b,d);
            if (!b)
                throw new Error('"className" argument is required');
            this.className = b,
            this.flag = d,
            this.startListener = new a(document,"touchstart",this.touchStart,this),
            this.endListener = new a(document,"touchend",this.touchEnd,this)
        }
        ;
        return c.prototype.touchStart = function(c) {
            var d = b.getTargetedEl(c.target, this.className);
            return d && b.isScrollable(d) ? b.scrollToEnd(d, this.flag) : void (d && !this.moveListener && (this.moveListener = new a(d,"touchmove",this.touchMove,this)))
        }
        ,
        c.prototype.touchMove = function(a) {
            a.preventDefault()
        }
        ,
        c.prototype.touchEnd = function(a) {
            this.moveListener && (this.moveListener.remove(),
            delete this.moveListener)
        }
        ,
        c.prototype.remove = function() {
            this.startListener.remove(),
            this.endListener.remove()
        }
        ,
        c
    }(a, b);
    var d;
    return d = function(a) {
        var b = {
            cache: {}
        };
        return b.add = function(b, c) {
            this.cache[b] || (this.cache[b] = new a(b,c))
        }
        ,
        b.remove = function(a) {
            this.cache[a] && (this.cache[a].remove(),
            delete this.cache[a])
        }
        ,
        b
    }(c)
});