$(document).ready(function () {
  // Ensure DataTable is initialized only once
  if ($.fn.dataTable.isDataTable('#example2')) {
      $('#example2').DataTable().destroy();
  }

  var table = $('#example2').DataTable({
      retrieve: true, // Retrieve existing instance instead of reinitializing
      lengthChange: false,
      buttons: ['copy', 'excel', 'pdf', 'print']
  });

  // Append buttons to DataTable wrapper
  table.buttons().container()
      .appendTo('#example2_wrapper .col-md-6:eq(0)');

  // Initialize DataTable for another table (#example) if needed
  if (!$.fn.dataTable.isDataTable('#example')) {
      $('#example').DataTable();
  }

});

$(document).ready(function () {
	dataModal();
  formSubmit();
});

function dataModal() {

  $('#table-modal').on('show.bs.modal', function (event) {
   
      let modalEvent = $(this);
      let modalTarget = event.relatedTarget;
      let modalUrl = $(modalTarget).attr('data-route');
      let modalTable = $(modalTarget).closest('.card').find('.table-ajax').attr('id');

      $(modalEvent).attr('data-table-ajax', modalTable);

      $.ajax({
          'url': modalUrl,
          'type': 'post',
          'dataType': 'html',
          'beforeSend': function () {
              $('#loader').removeClass('d-none');
         
          },
          'success': function (response) {
              $(modalEvent).find('.modal-dialog').removeClass('modal-lg').addClass('modal-xl').html(response);
          },
          'error': function (error) {
              console.error(error);
          },
          'complete': function () {
              $('#loader').addClass('d-none');
         
          },
      });
  });

  $('#table-modal').on('hide.bs.modal', function (event) {
    
      let modalEvent = $(this);

      $(modalEvent).removeAttr('data-table-ajax');
      $(modalEvent).find('.modal-dialog').removeClass('modal-lg').addClass('modal-xl').html('');
      $('.modal-backdrop').remove(); // Ensures no leftover backdrops
      location.reload();
  });

  $('#form-modal').on('show.bs.modal', function (event) {
    
      let modalEvent = $(this);
      let modalTarget = event.relatedTarget;
      let modalUrl = $(modalTarget).attr('data-route');
      let modalTable = $(modalTarget).closest('.card').find('.table-ajax').attr('id');

      $(modalEvent).attr('data-table-ajax', modalTable);

      $.ajax({
          'url': modalUrl,
          'type': 'post',
          'dataType': 'html',
          'beforeSend': function () {
              $('#loader').removeClass('d-none');
          
          },
          'success': function (response) {
            
              $(modalEvent).find('.modal-dialog').removeClass('modal-xl').addClass('modal-lg').html(response);
          },
          'error': function (error) {
              console.error(error);
          },
          'complete': function () {
              $('#loader').addClass('d-none');
       
          },
      });
  });

  $('#form-modal').on('hide.bs.modal', function (event) {
      let modalEvent = $(this);

      $(modalEvent).removeAttr('data-table-ajax');
      $(modalEvent).find('.modal-dialog').removeClass('modal-xl').addClass('modal-lg').html('');
      $('.modal-backdrop').remove(); // Ensures no leftover backdrops
      location.reload();
  });
}

function formSubmit() {
  $(document).on('submit', '.form-submit', function (event) {
 
  event.preventDefault();
  
  let formEvent = $(this);
  let formAction = $(formEvent).prop('action');
  let formMethod = $(formEvent).prop('method');
      let formTarget = $(formEvent).prop('target');
  let formArray = $(formEvent).serializeArray();
// 		let formObject = $(formEvent).serializeObject();
      // let formModal = $(formEvent).closest('#form-modal');
      let formModal = $(formEvent).closest('#table-modal');
      let formTable = $(formModal).attr('data-table-ajax');
      let formLength = $(formModal).length;
  let formData = new FormData(this);
  console.log(formData);
  
  $.ajax({
    'url': formAction,
    'data': formData,
    'type': formMethod,
    'dataType': 'json',
    'cache': false,
    'contentType': false,
    'processData': false,
    'beforeSend': function (event) {
              $('#status').removeClass('d-none');
         
      //$(formEvent).find('.card').busyLoad('show');
    },
    'success': function (response) {
        console.log(response);
        
      $('.form-group').removeClass('invalid-group');
      $('.form-group').find('.invalid-feedback').remove();
      
      if (response.status == 'success') {
        if (response.redirect) {
            let dataFlash = JSON.stringify({'message': response.message, 'status': response.status});
            
            sessionStorage.setItem('dataFlash', dataFlash);
            
            if (formTarget == '_blank') {
                  window.open(response.redirect, '_blank');
            } else {
                  window.open(response.redirect, '_self');
            }
        } else {
            if (formLength != 0) {
                          if (response.content) {
                              $(formModal).find('.modal-body').html(response.content);
                          } else {
                    $(formModal).modal('hide');
                          }
                
                if (formTable) {
                    dataDraw(formTable);
                }
            }
            // round_success_noti(response.message);
          showToast(response.message, response.status);
        }
      } else if (response.status == 'error') {

        showToast(response.message, response.status);
        // round_error_noti(response.message);
      } 
    }, 
    'error': function (error) {
      console.error(error);
    },
    'complete': function (event) {
              $('#loader').addClass('d-none');
      
      //$(formEvent).find('.card').busyLoad('hide');
    },
  });
});
}

function showToast(message,status){
  if(status=='success'){

    round_success_noti(message);

  }else if (status=='error'){

    round_error_noti(message);

  }else if(status=='warrning'){

    round_warning_noti(message)

  }else if(status=='info'){

    round_info_noti(message)

  }

}




