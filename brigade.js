const CONTAINER_VERSION = "1.0"

const CONTAINER = "lukepatrick/minio-node:" + CONTAINER_VERSION

const { events, Job } = require("brigadier")
const util = require('util')

events.on("exec", (e, p) => {

  // env info
  console.log("==> Project " + p.name + " clones the repo at " + p.repo.cloneURL)
  console.log("==> Event " + e.type + " caused by " + e.provider)

  // shared data path
  var dest = "/mnt/brigade/share/hello.txt"

  // create job with name and container image to use
  var minio_job = new Job("helm-job", CONTAINER) // runs minio_job 
  minio_job.storage.enabled = true

  //set up tasks
  minio_job.tasks = [
  "ls /mnt/brigade/share",
  "cat " + dest,
  "ls /src",
  "node src/file-upload.js"
  ]
  
  //create dummy data from another Job
  var simpledata = new Job("simpledata", "alpine:3.4")
  simpledata.storage.enabled = true

  simpledata.tasks = [
    "echo hello > " + dest,
    "echo " + e.buildID + " > " + dest,
    "echo ==> Project " + p.name + " clones the repo at " + p.repo.cloneURL + " > " + dest,
    "echo ==> Event " + e.type + " caused by " + e.provider + " > " + dest
    ]

  console.log("==> Set up tasks, env, Job ")
  //debug only
  console.log(minio_job)
  console.log(simpledata)

  console.log("==> Running Job")

  // run Start Job, get Promise and print results
  simpledata.run().then (simpleResults => {
    console.log("==> Job Results")
    console.log(simpleResults.toString())
    console.log("==> Job Done")
    minio_job.run().then( resultStart => {
        //debug only
        console.log("==> Job Results")
        console.log(resultStart.toString())
        console.log("==> Job Done")
        })
    })


})


events.on("error", (e) => {
    console.log("Error event " + util.inspect(e, false, null) )
    console.log("==> Event " + e.type + " caused by " + e.provider + " cause class" + e.cause + e.cause.reason)
})

events.on("after", (e) => {  
    console.log("After event fired " + util.inspect(e, false, null) )
})