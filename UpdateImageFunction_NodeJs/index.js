const AWS = require('aws-sdk');
const TABLE_NAME = "image-metadata";

exports.handler = (event, context, callback) => {
    console.log(event);
    var dynamodb = new AWS.DynamoDB();
    if (event.body.imageUuid) {
        if (event.body.status) {
            var getImageParam = {
                Key: {
                    "imageUuid": {
                        S: event.body.imageUuid
                    }
                },
                TableName: TABLE_NAME
            };
            //fetching the image for update
            dynamodb.getItem(getImageParam, function (err, data) {
                if (err) { console.log(err, err.stack); } // an error occurred
                else {
                    console.log(data.Item);
                    if (data.Item) {
                        data.Item.status.S = event.body.status
                        console.log(data.Item);
                        var updateParam = {
                            Item: data.Item,
                            TableName: TABLE_NAME
                        };
                        //updating status of the table
                        dynamodb.putItem(updateParam, function (err, data) {
                            if (err) { console.log(err, err.stack); } // an error occurred
                            else {
                                const response = {
                                    statusCode: 200,
                                    message: "Status updated!"
                                };
                                callback(null, response);
                            }
                        });
                    } else {
                        const response = {
                            statusCode: 400,
                            message: "The Image is not found!"
                        };
                        callback(null, response);
                    }
                }
            });
        } else {
            const response = {
                statusCode: 400,
                message: "Please provide a status for update!"
            };
            callback(null, response);
        }
    } else {
        const response = {
            statusCode: 400,
            message: "Please provide an imageUuid for updating status!"
        };
        callback(null, response);
    }
};
