(function() {
  'use strict';
  angular.module('vamosJuntas').factory('occurrencesFactory', occurrencesFactory);

  function occurrencesFactory() {
    return {
      build: function build(reports) {
        var addresses = reports.map((report) => {
          return report.address;
        })
        var uniqueAddresses = [...new Set(addresses)]

        var occurrences = uniqueAddresses.map((addressName) => {
          var relatedReports = reports.filter((report) => {
            return report.address == addressName;
          })

          var risks = relatedReports.map((report) => {
            return report.category;
          })

          var uniqueRisks = [...new Set(risks)]

          return {
            address: addressName,
            occurrences: uniqueRisks.map((risk) => {
              var relatedRisks = relatedReports.filter((report) => {
                return report.address == addressName && report.category == risk;
              })
              return {
                risk: risk,
                numberOfOccurrences: relatedRisks.length,
                reports: relatedRisks.map((risk) => {
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
