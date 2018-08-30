const AWS = require('aws-sdk');
const TABLE_NAME = "image-metadata";

exports.handler = (event, context, callback) => {
    console.log(event);
    var responseObject = {} //response Object to be returned from get API
    var dynamodb = new AWS.DynamoDB();

    var params = {
        TableName: TABLE_NAME
    };
    dynamodb.scan(params, function (err, data) {
        if (err) { console.log(err, err.stack); } // an error occurred
        else {
            if (data.Count > 0) {
                var images = [];
                for (var image in data.Items) {
                    var imageObject = {
                        "imageUuid": data.Items[image].imageUuid.S,
                        "fileName": data.Items[image].fileName.S,
                        "updloadedAt": data.Items[image].updloadedAt.N,
                        "bucketName": data.Items[image].bucketName.S,
                        "status": data.Items[image].status.S
                    }
                    images.push(imageObject)
                }
                responseObject.resultCount = images.length;
                responseObject.imagesMetadata = images;
                callback(null, responseObject);
            } else {  // if no images found
                var response = {
                    statusCode: 400,
                    message: "No Image Found!"
                };
                callback(null, response);
            }
        }
    });
};

