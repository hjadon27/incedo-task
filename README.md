# incedo-task

It contains 6  folders:

1. upload-image_Java : This contains a java code to upload an image.
2. SaveImageMetaData_Node.js : Lambda Function nodeJS code which saves the meta data in dynamodb table.
3. GetImageFunction_NodeJs: Lambda Function nodeJS code which gives image metadata to the GET /image endpoint.
4. UpdateImageFunction_NodeJs: Lambda Function nodeJS code which update status for image data, PUT /image endpoint.
5. SwaggerFileForAPIgateway : Contains swagger file for APIgateway.
6. PostmanCollectionFile: Postman collection for testing.


APIGateway endpoint

1. GET/   https://ji1w5l97u0.execute-api.eu-west-2.amazonaws.com/test/image (to get data of images)

Sample Response:
{
    "resultCount": 1,
    "imagesMetadata": [
        {
            "imageUuid": "990f05c0-aca5-11e8-929a-69f1e2791f8a",
            "fileName": "harendra_profile.jpg",
            "updloadedAt": "1535668787228",
            "bucketName": "incdeo-image",
            "status": "ACTIVE"
        }
    ]
}

2. PUT/  https://ji1w5l97u0.execute-api.eu-west-2.amazonaws.com/test/image (to update status of the image)

Sample Request Body:
{
	"imageUuid":"990f05c0-aca5-11e8-929a-69f1e2791f8a",
	"status":”INACTIVE”
}

Sample Response:
{
    "statusCode": 200,
    "message": "Status updated!"
}
