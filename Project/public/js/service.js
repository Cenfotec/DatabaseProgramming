let getMethodToAPI = function (service) {
    var jqxhr = $.get(service);
    return jqxhr;
};

let postMethodToAPI = function (service, data) {
    return $.ajax({
        type: 'POST',
        url: service,
        contentType: 'application/json',
        data: JSON.stringify(data)
    });
};