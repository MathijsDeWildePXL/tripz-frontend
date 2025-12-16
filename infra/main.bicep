metadata description = 'Deploy Tripz Frontend (SvelteKit) to Azure Static Web App'

param location string = resourceGroup().location
param staticSiteName string = 'tripz-frontend'
param environment string = 'production'
param repositoryUrl string = ''
param repositoryToken string = ''
@description('GitHub branch to deploy from')
param branch string = 'main'
param tags object = {
  environment: environment
  project: 'tripz'
}

resource staticSite 'Microsoft.Web/staticSites@2023-12-01' = {
  name: '${staticSiteName}-${environment}'
  location: location
  tags: tags
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    provider: 'GitHub'
    repositoryUrl: repositoryUrl
    repositoryToken: repositoryToken
    branch: branch
    buildProperties: {
      appLocation: '/'
      outputLocation: 'build'
      appBuildCommand: 'npm run build'
    }
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
  }
}

// Output the Static Web App details
output staticSiteId string = staticSite.id
output staticSiteName string = staticSite.name
output staticSiteUrl string = staticSite.properties.defaultHostname
output staticSiteResourceGroup string = resourceGroup().name
