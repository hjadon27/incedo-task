const AWS = require('aws-sdk');
const UUID = require('uuid');
const TABLE_NAME = "image-metadata";

exports.handler = (event, context, callback) => {
    saveMetadata(event.Records[0].s3);
};

function saveMetadata(s3data) {
    console.log(s3data);
    var dynamodb = new AWS.DynamoDB();
    var currentTime = new Date().getTime();

    var params = {
        Item: {
            "imageUuid": {
                S: UUID.v1()
            },
            "bucketName": {
                S: s3data.bucket.name
            },
            "fileName": {
                S: s3data.object.key
            },
            "size": {
                N: s3data.object.size.toString()
            },
            "updloadedAt": {
                N: currentTime.toString()
            },
            "status": {
                S: "ACTIVE"
            }
        },
        TableName: TABLE_NAME
    };
    dynamodb.putItem(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
}