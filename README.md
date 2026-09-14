# 🚀 DevOpsShop: Cloud Migration & AKS Platform Architecture

[![Azure](https://img.shields.io/badge/Microsoft_Azure-0089D6?logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com/)
[![Terraform](https://img.shields.io/badge/Terraform-7B42BC?logo=terraform&logoColor=white)](https://www.terraform.io/)
[![GitLab CI](https://img.shields.io/badge/GitLab_CI-FC6D26?logo=gitlab&logoColor=white)](https://about.gitlab.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)

**DevOpsShop** is a comprehensive cloud migration case study demonstrating the transition of a full-stack microservices application (React Frontend, Spring Boot Backend, PostgreSQL) from a local Minikube environment to a highly available **Azure Kubernetes Service (AKS)** production cluster. 

![DevOpsShop Architecture](architecture.png)

---

## 🌩️ Core Capabilities & Engineering Highlights

* **Seamless Cloud Migration:** Successfully transitioned workloads from local development environments to managed Azure infrastructure, establishing persistent storage claims (PVCs) for PostgreSQL and secure secret management.
* **Automated GitLab CI/CD:** Engineered a robust, multi-stage CI/CD pipeline (Test $\rightarrow$ Build $\rightarrow$ Push). Authenticated the pipeline securely against the AKS cluster by debugging and resolving complex `KUBE_TOKEN` runner authentication errors.
* **Secure Public Ingress (AGIC):** Implemented the Azure Application Gateway Ingress Controller to manage public traffic routing, mapping workloads to a secure public domain (`https://devopsshop.shop`) with enterprise-grade traffic control.
* **Infrastructure as Code (IaC) Foundation:** Replaced manual Azure Portal configurations with automated Terraform provider setups, utilizing Azure Storage for secure, remote backend state locking.

---

## 🏗️ Design Trade-Offs & Architectural Decisions

* **AGIC over NGINX Ingress:** Chose the Application Gateway Ingress Controller over a standard in-cluster NGINX deployment. AGIC operates directly at the Azure infrastructure layer, which reduces the resource footprint on the AKS worker nodes and allows the architecture to leverage native Azure load balancing and WAF capabilities.
* **GitLab Container Registry & imagePullSecrets:** Rather than managing a separate Azure Container Registry (ACR), the architecture tightly couples the pipeline with the GitLab Container Registry. AKS pods authenticate dynamically using Kubernetes Secrets (`imagePullSecret`), minimizing external registry dependencies.
* **Stateful Workload Management:** While databases are often moved to managed services (like Azure Database for PostgreSQL), this architecture demonstrates how to manage stateful deployments natively within AKS using strict Persistent Volume Claims (PVCs) mapped to Azure Disk storage.

---

## 🛠️ Tech Stack

* **Cloud Provider:** Microsoft Azure (AKS, Resource Groups, NSGs, Public IPs)
* **Infrastructure as Code:** Terraform (Azure Provider)
* **CI/CD Pipeline:** GitLab CI/CD, GitLab Container Registry
* **Container Orchestration:** Kubernetes (Deployments, Services, PVCs, Secrets)
* **Networking:** Application Gateway Ingress Controller (AGIC)
* **Application Workloads:** React.js, Spring Boot, PostgreSQL

---

## 📦 Project Structure

```text
devopsshop/
├── terraform/
│   ├── main.tf                    # AKS, Node Pools, and Network provisioning
│   ├── backend.tf                 # Azure Storage state configuration
│   └── variables.tf               # Environment variables
├── k8s/
│   ├── backend-deployment.yaml    # Spring Boot pods and services
│   ├── frontend-deployment.yaml   # React pods and services
│   ├── postgres-pvc.yaml          # Database deployment and PVCs
│   └── ingress-agic.yaml          # Application Gateway routing rules
└── .gitlab-ci.yml                 # Automated Test, Build, and Push pipeline
---

## 🚀 Deployment Guide

### Prerequisites
* Azure CLI (`az`) authenticated to a valid subscription
* Terraform CLI
* `kubectl`
* GitLab CI/CD Runner configured

### 1. Provision Infrastructure

```bash
cd terraform
terraform init
terraform plan -out=tfplan
terraform apply tfplan

2. Connect to AKS & Create Registry Secret

az aks get-credentials --resource-group rg-devopsshop --name aks-devopsshop

# Create the secret for AKS to pull from GitLab Container Registry
kubectl create secret docker-registry gitlab-registry-secret \
  --docker-server=registry.gitlab.com \
  --docker-username=<your-username> \
  --docker-password=<your-token>

3. Deploy Workloads & Ingress

kubectl apply -f k8s/postgres-pvc.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress-agic.yaml
