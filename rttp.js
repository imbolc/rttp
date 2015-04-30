(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.rttp = factory(root);
    }
})(this, function (root) {
    'use strict';

    var d = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        dataParser: function (xhr) {
            try {
                return JSON.parse(xhr.responseText);
            } catch (e) {
                return xhr.responseText;
            }
        },
        dataDumper: function (data) {
            return JSON.stringify(data);
        },
        errorCallback: function() {}
    };

    function setHeader(headers, key, value) {
        if (typeof(value) === 'function') {
            value = value();
        }
        if (value === null) {
            delete headers[key];
        } else {
            headers[key] = value;
        }
    }

    function updateHeaders(headers, updates) {
        headers = JSON.parse(JSON.stringify(headers));
        for(var k in updates) {
            setHeader(headers, k, updates[k]);
        }
        return headers;
    }

    function rttp(method, url, data, cfg) {
        cfg = cfg || {};
        var k, cbs,
            success = function () {},
            error = d.errorCallback,

            headers = updateHeaders(d.headers, cfg.headers || {}),
            parse = cfg.dataParser || d.dataParser,
            dump = cfg.dataDumper || d.dataDumper,

            XHR = root.XMLHttpRequest || ActiveXObject,
            xhr = new XHR('MSXML2.XMLHTTP.3.0');

        xhr.open(method, url, true);
        for (k in headers) {
            xhr.setRequestHeader(k, headers[k]);
        }
        xhr.send(dump(data));

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    success(parse(xhr), xhr);
                } else {
                    error(parse(xhr), xhr);
                }
            }
        };

        cbs = {
            success: function (callback) {
                success = callback;
                return cbs;
            },
            error: function (callback) {
                error = callback;
                return cbs;
            }
        };
        return cbs;
    }

    rttp.defaults = d;

    rttp.setup = function (cfg) {
        d.headers = updateHeaders(d.headers, cfg.headers || {});
        ['dataParser', 'dataDumper', 'errorCallback'].forEach(function (param) {
            d[param] = cfg[param] || d[param];
        });
    };
    rttp.get = function (url, cfg) {
        return rttp('GET', url, null, cfg);
    };
    rttp.post = function (url, data, cfg) {
        return rttp('POST', url, data, cfg);
    };
    rttp.put = function (url, data, cfg) {
        return rttp('PUT', url, data, cfg);
    };
    rttp.del = function (url, cfg) {
        return rttp('DELETE', url, null, cfg);
    };

    return rttp;
});
