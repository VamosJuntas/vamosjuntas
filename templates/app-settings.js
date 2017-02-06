AppSettings = {
  // @if NODE_ENV == 'DEVELOPMENT'
  mapsAPIBaseUrl: '/maps/api/place',
  apiBaseUrl: 'http://localhost:3001'
  // @endif
  // @if NODE_ENV == 'PRODUCTION'
  mapsAPIBaseUrl: 'https://maps.googleapis.com/maps/api/place',
  apiBaseUrl: '@@apiBaseUrl'
  // @endif
}
