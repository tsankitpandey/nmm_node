$(document).ready(function () {
  if ($.fn.DataTable) {
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
  }
});
if ($('.single-select').length) {
$('.single-select').select2({
  theme: 'bootstrap4',
  width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
  placeholder: $(this).data('placeholder'),
  allowClear: Boolean($(this).data('allow-clear')),
});
}

if ($('.single-select').length) {
$('.multiple-select').select2({
  theme: 'bootstrap4',
  width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
  placeholder: $(this).data('placeholder'),
  allowClear: Boolean($(this).data('allow-clear')),
});
}

$(document).ready(function() {
  if ($('.single-select').length) {
  $('.single-select').select2({
    placeholder: "Select a country"
  });
  
  // Get the data-route attribute from the parent div (or change the selector if attached elsewhere)
  var dataRoute = $('.select-country').data('route');
  
  // Make an AJAX request to the URL provided in data-route
  $.ajax({
    url: dataRoute,
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      // Loop through each country and append it as an option to the select element
  
      data.forEach(function(country) {
        $('.single-select').append(
          $('<option>', {
            value: country.value,
            text: country.label
          })
        );
      });
      // If using select2, notify it to update the list of options
      $('.single-select').trigger('change');
    },
    error: function(err) {
      console.error('Error fetching country data:', err);
    }
  });
  }
});

$(document).ready(function () {
	dataModal();
  formSubmit();
  formFile();
  console.log("check");
  console.log('custom.js loaded from:', document.currentScript);
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



$.initialize('.form-file', function () {
  let fileEvent = $(this);
  let fileValue = $(fileEvent).find('.form-file-input').attr('value');
let fileName = $(fileEvent).find('.form-file-input').attr('name');
let fileTitle = $(fileEvent).find('.form-file-input').attr('multiple') ? fileName+'[]' : fileName;
  let fileLabel = $(fileEvent).find('.form-file-input').attr('placeholder');
  let fileView = $(fileEvent).find('.form-file-input').attr('view');
  
  if (fileView == 'preview') {
      fileCSS = 'img-fluid col-6 mb-3';
  }
  
  if (fileView == 'profile') {
      fileCSS = 'img-cover';
  }
  
if (!$(fileEvent).hasClass('data-event')) {
  $(fileEvent).addClass('data-event');
      
      $(fileEvent).find('.form-file-input').attr('name', fileTitle);
      
    $(fileEvent).before('<div class="form-file-preview text-center"></div>').wrap('<div class="input-group form-file-group"></div>').after('<div class="input-group-append"><span class="input-group-text input-reset ripple d-none"><i class="bx bx-x"></i></span><span class="input-group-text input-click ripple"><i class="bx bx-cloud-upload"></i></span></div>');
    
    $(fileEvent).closest('.form-file-group').before('<input type="hidden" class="form-control form-file-hidden" name="'+fileName+'" value="'+fileValue+'" placeholder="'+fileLabel+'"  view="'+fileView+'">');
    
    
    if (fileValue) {
          let fileArray = fileValue.split(',');
          
          $.each(fileArray, function (key, value) {
              let fileUrl = value;
               let fileImage = $('<img/>', {
                          'class': fileCSS,
                          'src': fileUrl,
                      });
                      console.log(fileImage)
                      $(fileEvent).closest('.form-group').find('.form-file-preview').append(fileImage);
              // fetch(fileUrl).then(function (reponse) {
              //     if (reponse.headers.get('content-type').includes('image')) {
                     
              //     }
              // });
          });
          
          $(fileEvent).find('.form-file-label').html('<span>'+fileLabel+'</span>');
    } else {
          $(fileEvent).find('.form-file-label').html('<span>'+fileLabel+'</span>');
    }
}
});

function formFile() {

  $(document).on('change', '.form-file-group .form-file-input', function (event) {

      let fileEvent = $(this);
      let fileView = $(fileEvent).closest('.form-group').find('.form-file-hidden').attr('view');
      let fileName = $(fileEvent).closest('.form-group').find('.form-file-hidden').attr('name');
      
      if (fileView == 'preview') {
          fileCSS = 'img-fluid col-6 mb-3';
      } 
      
      if (fileView == 'profile') {
          fileCSS = 'img-cover';
      }
      
      let fileValue = '';
    
      $(fileEvent).closest('.form-group').find('.input-reset').removeClass('d-none');
      
      $(fileEvent).closest('.form-group').find('.form-file-preview').html('');
     
      $($(fileEvent)[0].files).each(function (key, value) {
          let fileData = $(value)[0];
          let fileReader = new FileReader();
      
          fileValue += fileData.name + ',';
          
          fileReader.onload = function (event) {
              /*if (fileName.includes("attendee")) {
                  let base64Data = resizedataURL(event.target.result);
                  localStorage.setItem(fileName, event.target.result);
              }*/
              
              if (fileName.includes("attendee")) {
                  resizeImage(event.target.result,300, 300).then((result) => {
               
                      localStorage.setItem(fileName, result);
                  });
              }
              
              
              if (fileData.type.includes('image')) {
                  let fileImage = $('<img/>', {
                      'class': fileCSS,
                      'src': event.target.result,
                  });
                  console.log(fileImage);
                  $(fileEvent).closest('.form-group').find('.form-file-preview').append(fileImage);
              }
          }
          
          fileReader.readAsDataURL(fileData);
    });
    
    if (fileValue) {
        fileValue = fileValue.replace(/,*$/, '');
        
          $(fileEvent).closest('.form-group').find('.form-file-label').html(fileValue);
    }
});

  $(document).on('click', '.form-file-group .input-reset', function (event) {
   
      let fileEvent = $(this);
      let fileValue = $(fileEvent).closest('.form-group').find('.form-file-hidden').attr('value');
      let fileLabel = $(fileEvent).closest('.form-group').find('.form-file-input').attr('placeholder');
      let fileView = $(fileEvent).closest('.form-group').find('.form-file-hidden').attr('view');
      
      if (fileView == 'preview') {
          fileCSS = 'img-fluid col-6 mb-3';
      }
      
      if (fileView == 'profile') {
          fileCSS = 'img-cover';
      }
      
      $(fileEvent).closest('.form-group').find('.input-reset').addClass('d-none');
      
      $(fileEvent).closest('.form-group').find('.form-file-preview').html('');
      
      $(fileEvent).closest('.form-group').find('.form-file-input').val('');
      
      if (fileValue) {
          let fileArray = fileValue.split(',');
          
          $.each(fileArray, function (key, value) {
              let fileUrl = value;
              
              fetch(fileUrl).then(function (reponse) {
                  if (reponse.headers.get('content-type').includes('image')) {
                      let fileImage = $('<img/>', {
                          'class': fileCSS,
                          'src': fileUrl,
                      });
                     console.log(fileImage)
                      $(fileEvent).closest('.form-group').find('.form-file-preview').append(fileImage);
                  }
              });
          });
          
          $(fileEvent).closest('.form-group').find('.form-file-label').html('<span>'+fileLabel+'</span>');
      } else {
          $(fileEvent).closest('.form-group').find('.form-file-label').html('<span>'+fileLabel+'</span>');
      }
  });
}


//----------- Timeline js Start--------

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

  document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("memberId").value = getCookie("userId");
  document.getElementById("companyId").value = getCookie("company_id");
});
  document.getElementById('addPhotoBtn').addEventListener('click', function() {
      document.getElementById('photoInput').click();
  });

  document.getElementById('addVideoBtn').addEventListener('click', function() {
      document.getElementById('videoInput').click();
  });

  document.getElementById('addMusicBtn').addEventListener('click', function() {
      document.getElementById('musicInput').click();
  });

  // Handle file input and preview
  document.getElementById('photoInput').addEventListener('change', function(event) {
      showPreview(event.target.files[0], 'photo');
  });

  document.getElementById('videoInput').addEventListener('change', function(event) {
      showPreview(event.target.files[0], 'video');
  });

  document.getElementById('musicInput').addEventListener('change', function(event) {
      showPreview(event.target.files[0], 'music');
  });

  function showPreview(file, type) {
      let previewContainer = document.getElementById('previewContainer');
      previewContainer.innerHTML = ''; // Clear any previous preview

      let previewElement;

      if (type === 'photo') {
          previewElement = document.createElement('img');
          previewElement.src = URL.createObjectURL(file);
      } else if (type === 'video') {
          previewElement = document.createElement('video');
          previewElement.src = URL.createObjectURL(file);
          previewElement.controls = true;
      } else if (type === 'music') {
          previewElement = document.createElement('audio');
          previewElement.src = URL.createObjectURL(file);
          previewElement.controls = true;
      }

     
      previewContainer.appendChild(previewElement);

     
      let removeBtn = document.createElement('button');
      removeBtn.innerHTML = 'remove x';
      removeBtn.className = 'remove-preview';
      previewContainer.appendChild(removeBtn);

      removeBtn.addEventListener('click', function() {
          previewContainer.innerHTML = ''; 
          document.getElementById('photoInput').value = '';
          document.getElementById('videoInput').value = '';
          document.getElementById('musicInput').value = '';
      });
  }
//----------- Timeline js END--------

