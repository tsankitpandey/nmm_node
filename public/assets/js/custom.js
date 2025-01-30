
$(document).ready(function () {
	dataModal();
  formSubmit();
});

/* Rounded corners Notifications */
function round_default_noti(msz) {
	Lobibox.notify('default', {
		pauseDelayOnHover: true,
		size: 'mini',
		rounded: true,
		delayIndicator: false,
		continueDelayOnInactiveTab: false,
		position: 'top right',
		msg: msz
	});
}

function round_info_noti(msz) {
	Lobibox.notify('info', {
		pauseDelayOnHover: true,
		size: 'mini',
		rounded: true,
		icon: 'bx bx-info-circle',
		delayIndicator: false,
		continueDelayOnInactiveTab: false,
		position: 'top right',
		msg: msz
	});
}

function round_warning_noti(msz) {
	Lobibox.notify('warning', {
		pauseDelayOnHover: true,
		size: 'mini',
		rounded: true,
		delayIndicator: false,
		icon: 'bx bx-error',
		continueDelayOnInactiveTab: false,
		position: 'top right',
		msg: msz
	});
}

function round_error_noti(msz) {
	Lobibox.notify('error', {
		pauseDelayOnHover: true,
		size: 'mini',
		rounded: true,
		delayIndicator: false,
		icon: 'bx bx-x-circle',
		continueDelayOnInactiveTab: false,
		position: 'top right',
		msg: msz
	});
}

// function round_success_noti(msz) {
//     console.log(msz)
// 	Lobibox.notify('success', {
// 		pauseDelayOnHover: true,
// 		size: 'mini',
// 		rounded: true,
// 		icon: 'bx bx-check-circle',
// 		delayIndicator: false,
// 		continueDelayOnInactiveTab: false,
// 		position: 'top right',
// 		msg: msz
// 	});
// }

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




