rttp
====

rttp is a tiny and simple http requests module

Example
-------
    rttp.get('/url')
        .success(function (data, xhr) { })
        .error(function (data, xhr) { });

API
---
    rttp(method, url, data, config)
    rttp.get(url, config)
    rttp.post(url, data, config)
    rttp.put(url, data, config)
    rttp.del(url, config)


Config options
--------------
- `headers`:  [obj], default: `{ 'Content-Type': 'application/json; charset=utf-8' }`
- `dataParser`: function for parsing response data
- `dataDumper`: function for dumping response data


Change defaults
---------------
    rttp.setup({
        headers: {
            // add auth header to each request
            Authorization: function () { return 'Bearer ' + localStorage.getItem('auth_token'); },

            // remove default Content-Type header
            'Content-Type': null
        },

        // set default error callback
        errorCallback: function (data, xhr) {
            alert(xhr.status + ': ' + xhr.statusText);
        }

        // change default data parser
        dataParser: function (xhr) { ... },

        // change default data dumper
        dataDumper: function (data) { ... }
    });
