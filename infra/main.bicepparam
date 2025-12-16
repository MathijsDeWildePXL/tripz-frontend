using './main.bicep'

param location = 'eastus'
param staticSiteName = 'tripz-frontend'
param environment = 'production'
param repositoryUrl = ''
param repositoryToken = ''
param branch = 'main'
param tags = {
  environment: 'production'
  project: 'tripz'
}
