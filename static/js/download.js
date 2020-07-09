$(document).ready(function () {
  $('#load_data').click(function () {
    $.ajax({
      url: "static/downloaddata/civil_war_data_hmdb.csv",
      dataType: "text",
      success: function (data) {
        var printCounter = 0;
        var hmdb_data = data.split(/\r?\n|\r/);
        var table_data = '<table id="example"  class="table table-bordered table-striped">';
        table_data += '<thead>';
        table_data += '<tr>';
        var count = 0;
        var cell_data = hmdb_data[count].split(",");
        for (var cell_count = 0; cell_count < cell_data.length; cell_count++){
          table_data += '<th>' + cell_data[cell_count] + '</th>';
        }
        table_data += '</tr>';
        table_data += '</thead>';
        for (var count = 1; count < hmdb_data.length; count++) {
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
        $('#example').DataTable( {
          dom: 'Bfrtip',
          buttons: [
              'copy',
              {
                  extend: 'excel',
                  messageTop: 'The information in this table is copyright to Sirius Cybernetics Corp.'
              },
              {
                  extend: 'pdf',
                  messageBottom: null
              },
              {
                  extend: 'print',
                  messageTop: function () {
                      printCounter++;
                      if ( printCounter === 1 ) {
                          return 'This is the first time you have printed this document.';
                      }
                      else {
                          return 'You have printed this document '+printCounter+' times';
                      }
                  },
                  messageBottom: null
              }
          ]
      } )
      }
    });
  });
  console.log($().jquery); 
});