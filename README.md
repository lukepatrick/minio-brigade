# minio-brigade


minio-brigade is a [Brigade](https://github.com/Azure/brigade) Project that utilizes [Minio](https://github.com/minio). 

This Project was designed to show a Brigade Job generating data files (e.g. unit test results and code coverage),
sharing the files in the Brigade Project Shared PVC, and finally persisting the data in an object storage
service using a Minio-JS client.

## Prerequisites

1. Have a running [Kubernetes](https://kubernetes.io/docs/setup/) environment
2. Setup [Helm](https://github.com/kubernetes/helm) - this assumes Helm on your Host regardless of the Helm container used later on. 
3. (optional) an NFS Provisioner - my environment uses Kubernetes clusters running on standalone bare metal machines. 
    Recommended simple NFS Provisioner is [IlyaSemenov/nfs-provisioner-chart](https://github.com/IlyaSemenov/nfs-provisioner-chart).
    Follow the instructions for adding the helm repo. At install set this as the default Provisioner:
```bash
$ helm install --name nfs-provisioner --namespace nfs-provisioner nfs-provisioner/nfs-provisioner --set defaultClass=true
```
    If  not already set up on your host, add nfs-commons
```bash
$ apt-get install nfs-commons
```


## Install

### Set up Brigade

Follow the [quick-start guide](https://github.com/Azure/brigade#quickstart):

Install Brigade into your Kubernetes cluster is to install it using Helm.

```bash
$ helm repo add brigade https://azure.github.io/brigade
$ helm install -n brigade brigade/brigade
```

To manually run Brigade Projects the **brig** binary is required. Follow the
[Developers Guide](https://github.com/Azure/brigade/blob/master/docs/topics/developers.md)
to build the binary. Assuming Brigade is cloned and prerequisites met, simply run:
```bash
$ make brig
```
Test **brig** with `brig version`

### Install minio-brigade Project

Clone minio-brigade and change directory
```bash
$ git clone https://github.com/lukepatrick/minio-brigade
$ cd minio-brigade
```
Helm install minio-brigade
> note the name and namespace can be customized
```bash
$ helm install --name minio-brigade brigade/brigade-project -f minio-brigade.yaml
```

### Set up Minio

```bash
$ kubectl apply -f minio-deployment/minio-deployment.yaml
```

## Usage

Manually run the project. The project name is the same as the project value in
the *minio-brigade.yaml*
```bash
$ brig run lukepatrick/minio-brigade
```

## Contribute

PRs accepted.

## License

MIT