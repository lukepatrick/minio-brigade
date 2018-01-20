var Minio = require('minio')

// Instantiate the minio client with the endpoint
// and access keys as shown below.
var minioClient = new Minio.Client({
    endPoint: 'minio',
    port: 9000,
    secure: false,
    accessKey: 'minio',
    secretKey: 'minio123'
});

// File that needs to be uploaded.
var file = "/mnt/brigade/share/hello.txt"

// Make a bucket called europetrip.
minioClient.makeBucket('europetrip', 'us-east-1', function(err) {
    if (err) return console.log(err)

    console.log('Bucket created successfully in "us-east-1".')

    // Using fPutObject API upload your file to the bucket europetrip.
    minioClient.fPutObject('europetrip', 'photos-europe.tar', file, 'application/octet-stream', function(err, etag) {
      if (err) return console.log(err)
      console.log('File uploaded successfully.')
    });
});


// in brig task: node file-upload.js