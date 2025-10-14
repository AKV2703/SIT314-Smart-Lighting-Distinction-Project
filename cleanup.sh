#!/bin/bash

echo " Smart Lighting Kubernetes Cleanup Script"

# Confirmation prompt
read -p "This will DELETE the entire 'smart-lighting' namespace and all resources. Continue? (y/N): " confirm

if [[ "$confirm" =~ ^[Yy]$ ]]; then
    echo ""
    echo "Deleting Smart Lighting namespace..."
    kubectl delete namespace smart-lighting

    echo ""
    echo "Cleanup complete. All Smart Lighting resources have been removed."
else
    echo ""
    echo "Cleanup cancelled. No changes were made."
fi