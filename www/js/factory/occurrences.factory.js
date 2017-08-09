(function() {
  'use strict';
  angular.module('vamosJuntas').factory('occurrencesFactory', occurrencesFactory);

  function occurrencesFactory() {
    return {
      build: function build(reports) {
        var addresses = reports.map(function (report) {
          return report.address;
        });

        var uniqueAddresses = [...new Set(addresses)]

        var occurrences = uniqueAddresses.map(function(addressName) {
          var relatedReports = reports.filter(function(report) {
            return report.address == addressName;
          })

          var risks = relatedReports.map(function(report) {
            return report.category;
          })

          var uniqueRisks = [...new Set(risks)]

          return {
            address: addressName,
            occurrences: uniqueRisks.map(function(risk) {
              var relatedRisks = relatedReports.filter(function(report) {
                return report.address == addressName && report.category == risk;
              })
              return {
                risk: risk,
                numberOfOccurrences: relatedRisks.length,
                reports: relatedRisks.map(function(risk) {
                  return { date: risk.date }
                })
              }
            })
          }
        })

        return occurrences;
      }
    };
  }
})();
