$(document).ready(function () {
  $('#load_data').click(function () {
    $.ajax({
      url: "static/downloaddata/civil_war_data_hmdb.csv",
      dataType: "text",
      success: function (data) {
        var hmdb_data = data.split(/\r?\n|\r/);
        var table_data = '<table id="example"  class="table table-bordered table-striped">';
        for (var count = 0; count < hmdb_data.length; count++) {
          var cell_data = hmdb_data[count].split(",");
          table_data += '<tr>';
          for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
            if (count === 0) {
              table_data += '<th>' + cell_data[cell_count] + '</th>';
            }
            else {
              if (cell_count === 6) {
                table_data += '<td>' + '<a href=' + cell_data[cell_count] + ' target="_blank">' + cell_data[cell_count] + '</a>' + '</td>';
              }
              else
                table_data += '<td>' + cell_data[cell_count] + '</td>';
            }
          }
          table_data += '</tr>';
        }
        table_data += '</table>';
        $('#hmdb_table').html(table_data);
        // $('#example').DataTable();
        $('#example').DataTable();
      }
    });
  }); 
  console.log($().jquery); 
});
// $(document).ready(function () {
//   $('#example').DataTable();
//   console.log($().jquery); 
// });
