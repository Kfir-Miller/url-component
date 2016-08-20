var config = {
    regex:{
        zipcode: /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i,
        phone: /\d{8,13}/,
        website: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        image: /\.(gif|jpg|jpeg|tiff|png)$/i,
        date:/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/,
        year:/^[0-9]{4}$/
    },
    validateTimeout: 650, //ms
};

app.constant('config', config);