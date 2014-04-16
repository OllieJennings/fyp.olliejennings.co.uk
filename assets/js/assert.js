var assert = (function (Q) {
    var toStr = Object.prototype.toString,
        toArr = Array.prototype.slice;

    //add basic questions/assertions to an object
    Q.isFun = function (item) {
        // Is item a function? Returns boolean
        return typeof (item) === "function";
    };
    Q.isArr = function (item) {
        // Is the item an Array? Returns boolean
        return item === null || Q.isUndef(item) ?
                false :
                typeof (item.length) === 'number' &&
                    !(item.propertyIsEnumerable('length')) &&
                    typeof (item.splice) === 'function';
    };
    Q.isObj = function (item) {
        // Is the item an Object? Returns boolean
        return item !== null && Q.isUndef(item) === false &&
            toStr.call(item) === "[object Object]" &&
            typeof (item.length) !== 'number' &&
            typeof (item.splice) !== 'function';
    };
    Q.isStr = function (item) {
        // Is the item a String? Returns boolean
        return toStr.call(item) === "[object String]";
    };
    Q.isNum = function (item) {
        // Is the item a Number (but not NaN)? Returns boolean
        return toStr.call(item) === "[object Number]" && !isNaN(item);
    };
    Q.isBool = function (item) {
        // Is the item a Boolean (rejecting "new Boolean(true)")? Returns boolean
        return typeof (item) === "boolean";
    };
    Q.isEmptyArr = function (item) {
        // Is the item an Empty Array ([])? Returns boolean
        return Q.isArr(item) && item.length === 0;
    };
    Q.isEmptyObj = function (item) {
        // Is the item an Empty Object ({})? Returns boolean
        var k;
        if (!Q.isObj(item)) { return false; }
        for (k in item) {
            if (item.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    };
    Q.isEmptyStr = function (item) {
        // Is the item an Empty String ("")? Returns boolean
        return Q.isEq(item, "");
    };
    Q.isEq = function (itemA, itemB) {
        // Is itemA exactly the same as itemB? Returns boolean
        return itemA === itemB;
    };
    Q.isUndef = function (item) {
        // Is item undefined? Returns boolean
        return typeof (item) === "undefined";
    };
    Q.same = function () {
        // Are all arguments the same? Compares all arguments. Returns boolean
        // e.g: same(1, 1, 1, 1) === true, same(1, "1", 1) === false
        var args = toArr.call(arguments);
        return Q.isEmptyArr(args) ?
                true :
                args.length === 1 ?
                        true :
                        Q.isEq(args[0], args[1]) ?
                                Q.same.apply(null, args.slice(1, args.length)) :
                                false;
    };
    Q.objHas = function (obj, chain) {
        // Does an objects contain (nested) properties? Returns boolean
        // e.g: tObj = {a: {b: {c: {d: 1}}}}, objHas(tObj, "a.b.c.d") === true, objHas(tObj, "a.b.c.x") === false
        if (Q.isStr(chain) && chain.charAt(0) !== ".") {
            chain = chain.split(".");
            return Q.isEmptyStr(chain[0]) ?
                    true :
                    (obj.hasOwnProperty(chain[0])) ?
                            Q.objHas(obj[chain[0]], chain.slice(1).join(".")) :
                            false;
        }
        return false;
    };
    Q.inArr = function (val, arr) {
        // Is the val/value in the arr/array? Returns boolean
        return Q.isArr(arr) && arr.length > 0 ?
                val === arr[0] ?
                        true : Q.inArr(val, arr.slice(1)) :
                false;
    };
    return Q;
}(assert || {}));
