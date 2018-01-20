const Minio = require('minio')

const file_path = process.env.FILE_PATH
const accessKey = process.env.ACCESS_KEY
const secretKey = process.env.SECRET_KEY



// Instantiate the minio client with the endpoint
// and access keys as shown below.
var minioClient = new Minio.Client({
    endPoint: 'minio',
    port: 9000,
    secure: false,
    accessKey: accessKey,
    secretKey: secretKey
});

// File that needs to be uploaded.
var file = file_path

// Make a bucket called europetrip.
//minioClient.makeBucket('europetrip', 'us-east-1', function(err) {
//    if (err) return console.log(err)
// assume BUCKET exists from minio-deployment.yaml JOB

//    console.log('Bucket created successfully in "us-east-1".')

// Using fPutObject API upload your file to the bucket europetrip.
minioClient.fPutObject('bucket', 'hello.txt', file, 'application/octet-stream', function(err, etag) {
    if (err) return console.log(err)
    console.log('File uploaded successfully.')
});
//});

