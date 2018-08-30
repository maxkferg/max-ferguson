let s3 = require('s3');

let client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  s3Options: {
    accessKeyId: "your s3 key",
    secretAccessKey: "your s3 secret",
  },
});

let params = {
  localDir: "dist/",
  deleteRemoved: false,
  s3Params: {
    Bucket: "worksite-models",
    Prefix: "/",
  },
};


function upload(){
  let uploader = client.uploadDir(params);

  return new Promise(function(resolve,reject){
    uploader.on('progress', function() {
      console.log("progress", uploader.progressAmount, uploader.progressTotal);
    });

    // Resolve on success
    uploader.on('end', function() {
      console.log("done uploading");
      resolve();
    });

    // Reject on error
    uploader.on('error', function(err) {
      console.error("unable to sync:", err.stack);
      reject(err);
    });
  });
}

upload();