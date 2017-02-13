AppSettings = {
  // @if NODE_ENV == 'DEVELOPMENT'
  mapsAPIBaseUrl: '/maps/api/place',
  apiBaseUrl: 'http://localhost:3001',
  apiKey: '@@apiKey'
  // @endif
  // @if NODE_ENV == 'PRODUCTION'
  mapsAPIBaseUrl: 'https://maps.googleapis.com/maps/api/place',
  apiBaseUrl: '@@apiBaseUrl',
  apiKey: '@@apiKey'
  // @endif
}
