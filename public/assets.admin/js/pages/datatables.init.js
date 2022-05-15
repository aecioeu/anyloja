$(document).ready(function () {
  $("#basic-datatable").DataTable({
    autoWidth: false,
    language: {
      paginate: {
        previous: "<i class='uil uil-angle-left'>",
        next: "<i class='uil uil-angle-right'>",
      },
    },
    drawCallback: function () {
      $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
    },
  });
});
