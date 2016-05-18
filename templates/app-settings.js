AppSettings = {
  // @if NODE_ENV == 'DEVELOPMENT'
  mapsAPIBaseUrl: '/maps/api/place'
  // @endif
  // @if NODE_ENV == 'PRODUCTION'
  mapsAPIBaseUrl: 'https://maps.googleapis.com/maps/api/place'
  // @endif
}
