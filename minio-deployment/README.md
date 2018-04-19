# minio-deployment

This manifest is based on the example from [Heptio Ark](https://github.com/heptio/ark/)

Upon install, this will create a default bucket called "bucket".

## Install

```bash
$ kubectl apply -f minio-deployment.yaml
```

If you are running MiniKube, the above may not work. If so, try the other script:

```shell
$ ./minio_distrubuted.sh
```
from the [Minio Docs](https://github.com/minio/minio/blob/master/docs/orchestration/minikube/README.md)