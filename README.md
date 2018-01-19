# minio-brigade


minio-brigade is a [Brigade](https://github.com/Azure/brigade) Project that utilizes [Minio](https://github.com/minio). 

## Prerequisites

1. Have a running [Kubernetes](https://kubernetes.io/docs/setup/) environment
2. Setup [Helm](https://github.com/kubernetes/helm) - this assumes Helm on your Host regardless of the Helm container used later on. 

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

### Install minio-brigade

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
$ kubectl apply -f minio-deployment.yaml
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