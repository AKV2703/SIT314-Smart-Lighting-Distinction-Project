#!/bin/bash

# Smart Lighting System - Kubernetes Deploy

echo "Starting Smart Lighting Kubernetes deployment..."

echo "Creating Namespace..."
kubectl apply -f K8s-Manifests/namespaces/namespace.yaml

echo "Applying ConfigMaps..."
kubectl apply -f K8s-Manifests/configmaps/

echo "Applying Secrets..."
kubectl apply -f K8s-Manifests/secrets/

echo "Deploying Services (Pods)..."
kubectl apply -f K8s-Manifests/deployments/

echo "Exposing Deployments via Services..."
kubectl apply -f K8s-Manifests/services/

echo "Setting up Horizontal Pod Autoscalers..."
kubectl apply -f K8s-Manifests/autoscaling/

echo "All manifests applied successfully."
kubectl get all -n smart-lighting

echo "Smart Lighting System deployed successfully to Kubernetes."