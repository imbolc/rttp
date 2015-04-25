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

    rttp.setup({default: options})


Config options
--------------
- `headers`:  [obj], default: `{ 'Content-Type': 'application/json; charset=utf-8' }`
- `dataParser`: function for parsing response data


Change defaults
---------------
    rttp.setup({
        headers: {
        },


    });

    rttp.setup({
        headers: {
            // add auth header to each request
            Authorization: function () { return 'Bearer ' + localStorage.getItem('satellizer_token'); },

            // remove default Content-Type header
            'Content-Type': null
        },

        dataParser: function (xhr) { return JSON.parse(xhr.responseText); }
    });
