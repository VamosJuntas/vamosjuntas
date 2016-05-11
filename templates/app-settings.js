AppSettings = {
  // @if NODE_ENV == 'DEVELOPMENT'
  mapsApiBaseUrl: '/maps/api/place'
  // @endif
  // @if NODE_ENV == 'PRODUCTION'
  mapsApiBaseUrl: 'https://maps.googleapis.com/maps/api/place'
  // @endif
}
