
var LoadJson = function (json, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', json, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.response);
            } else {
                console.log(xhr.status);
            }
        }
    }
    xhr.send();
}
var messageHandler = function (e) {
    var appPath = e.data;
    LoadJson(appPath, function (response) {
        this.close();
        postMessage(response);
    });
}
addEventListener('message', messageHandler, true);
