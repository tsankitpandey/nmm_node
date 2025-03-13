$(document).ready(function () {
  if ($.fn.DataTable) {
    if ($.fn.dataTable.isDataTable('#example2')) {
        $('#example2').DataTable().destroy();
    }

    var table = $('#example2').DataTable({
        retrieve: true, 
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf', 'print']
    });

    table.buttons().container()
        .appendTo('#example2_wrapper .col-md-6:eq(0)');

    if (!$.fn.dataTable.isDataTable('#example')) {
        $('#example').DataTable();
    }
  }

    document.querySelectorAll(".form-check-all").forEach(mainCheckbox => {
     
        mainCheckbox.addEventListener("change", function () {
            let table = this.closest("table");
            let checkboxes = table.querySelectorAll(".form-check-this");
            checkboxes.forEach(checkbox => checkbox.checked = this.checked);
        });
    });


    document.querySelectorAll(".form-check-this").forEach(rowCheckbox => {
        rowCheckbox.addEventListener("change", function () {
            let table = this.closest("table");
            let mainCheckbox = table.querySelector(".form-check-all");
            let allChecked = table.querySelectorAll(".form-check-this:checked").length === table.querySelectorAll(".form-check-this").length;
            mainCheckbox.checked = allChecked;
        });
    });

});

function activateSelectedEmails() {
    let selectedIds = [];
    
    document.querySelectorAll(".form-check-this:checked").forEach(checkbox => {
        selectedIds.push(checkbox.value);
    });

    if (selectedIds.length === 0) {
        alert("Please select at least one email to activate.");
        return;
    }

    let idsString = selectedIds.join(",");

    window.location.href = `/emailActivate?id=${idsString}`;
}
function deactivateSelectedEmails() {
    let selectedIds = [];

    document.querySelectorAll(".form-check-this:checked").forEach(checkbox => {
        selectedIds.push(checkbox.value);
    });

    if (selectedIds.length === 0) {
        alert("Please select at least one email to deactivate.");
        return;
    }

    let idsString = selectedIds.join(",");

    window.location.href = `/emailDeactivate?id=${idsString}`;
}
function deleteSelectedEmails() {
    let selectedIds = [];

    document.querySelectorAll(".form-check-this:checked").forEach(checkbox => {
        selectedIds.push(checkbox.value);
    });

    if (selectedIds.length === 0) {
        alert("Please select at least one email to delete.");
        return;
    }

    if (!confirm("Are you sure you want to delete the selected emails?")) {
        return;
    }

    let idsString = selectedIds.join(",");

    window.location.href = `/CustomTemDelete?id=${idsString}`;
}


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



$(document).ready(function () {
    function initializeSelect2(selector, placeholderText) {
        if ($(selector).length) {
            $(selector).select2({
                placeholder: placeholderText,
                allowClear: true
            });
        }
    }
  

    initializeSelect2('.single-select', "Select a country");
    initializeSelect2('.single-city-select', "Select a city");
    initializeSelect2('.single-timezone-select', "Select a timezone");
  
    var countryRoute = $('.select-country').data('route');
    var cityRoute = $('.select-city').data('route');
    var timezoneRoute = $('.select-timezone').data('route');
  
    if ($('.single-select').length) {
       
        $.ajax({
            url: countryRoute,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var countrySelect = $('.single-select');
                countrySelect.empty().append('<option value="" disabled selected>Choose...</option>');
  
                $.each(data, function (index, country) {
                    countrySelect.append(new Option(country.label, country.value));
                });
  
      
                if (typeof companyData !== "undefined" && companyData.data.length > 0) {
                    var selectedCountry = companyData.data[0].country;
                    countrySelect.val(selectedCountry).trigger('change'); 
                }
            },
            error: function (err) {
                console.error('Error fetching country data:', err);
            }
        });
  
      
        $('.single-select').on('change', function () {
            var countryId = $(this).val() ? $(this).val().split(":")[0] : "";
  
         
            if ($('.single-city-select').length) {
                updateDropdown('.single-city-select', cityRoute, countryId, "Select a city");
            }
  
            if ($('.single-timezone-select').length) {
                updateDropdown('.single-timezone-select', timezoneRoute, countryId, "Select a timezone");
            }
        });
    }
  
    function updateDropdown(selector, route, countryId, placeholder) {
        if (!countryId) {
            $(selector).html('<option value="">'+ placeholder +'</option>').trigger('change');
            return;
        }
  
        $.ajax({
            url: route,
            method: 'GET',
            data: { country_id: countryId },
            dataType: 'json',
            success: function (data) {
                var dropdown = $(selector);
                dropdown.empty().append('<option value="" disabled selected>'+ placeholder +'</option>');
  
                $.each(data, function (index, item) {
                    dropdown.append(new Option(item.label, item.value));
                });
  
                dropdown.val("").trigger('change');
            },
            error: function (err) {
                console.error('Error fetching data:', err);
            }
        });
    }
  });
  



$(document).ready(function () {
	dataModal();
  formSubmit();
  formFile();
  dataAppend();
  dataAppend1();
  confirmBox();
});

function confirmBox() {
  $(document).on('click', '.confirm-box', function (event) {
      event.preventDefault();
      
      let confirmEvent = $(this);
      let confirmUrl = $(confirmEvent).attr('data-route');
      let confirmObject = $(confirmEvent).attr('data-object');
      let confirmTitle = $(confirmEvent).attr('data-title');
      let confirmContent = $(confirmEvent).attr('data-content');
      let confirmType = $(confirmEvent).attr('data-type');
      let confirmTable = $(confirmEvent).closest('.card').find('.table-ajax').attr('id');
      
      if (confirmObject) {
          confirmObject = JSON.parse(confirmObject);
      }
      
      $.confirm({
          'title': confirmTitle,
          'content': confirmContent,
          'type': confirmType,
          'draggable': false,
          'animation': 'none',
          'closeAnimation': 'none',
          'closeIcon': true,
          'typeAnimated': false,
          'animateFromElement': false,
          'backgroundDismiss': false,
          'backgroundDismissAnimation': '',
          'closeIconClass': 'fa-solid fa-times text-sm',
          'buttons': {
              'confirm': {
                  'text': '<i class="fa-solid fa-check"></i> Confirm',
                  'btnClass': 'btn-green ripple',
                  'action': function (event) {
                      $.ajax({
                          'url': confirmUrl,
                          'data': confirmObject,
                          'type': 'post',
                          'dataType': 'json',
                          'cache': false,
                          'success': function (response) {
                              console.log(response);
                              
                              if (response.status == 'success') {
                                  if (response.redirect) {
                                      let dataFlash = JSON.stringify({'message': response.message, 'status': response.status});
                                      
                                      sessionStorage.setItem('dataFlash', dataFlash);
                                      
                                      window.open(response.redirect, '_self');
                                  } else {
                                      if (confirmTable) {
                                          dataDraw(confirmTable);
                                      }
                                      
                                      showToast(response.message, response.status);
                                  }
                              } else if (response.status == 'error') {
                                  showToast(response.message, response.status);
                              }
                          },
                          'error': function (error) {
                              console.error(error);
                          },
                      });
                  },
              },
              'cancel': {
                  'text': '<i class="fa-solid fa-times"></i> Cancel',
                  'btnClass': 'btn-red ripple',
              },
          },
      });
  });
}

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
              $('#loader').removeClass('d-none');
         
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

function dataAppend() {
  $.initialize('.form-append', function () {
    let appendEvent = $(this);
      let appendLength = $(appendEvent).children('.form-container').length;
      let appendCount = $(appendEvent).children('.form-container').length;
    let appendType = $(appendEvent).attr('data-append');
    let appendLimit = $(appendEvent).attr('data-limit');
    let appendHide = appendType == 'false' ? 'd-none' : '';
    
      appendLimit = appendLimit ? appendLimit : 100;
      
      $(appendEvent).children('.form-container').each(function (index, data) {
          let groupData = data;
          let groupIndex = index;
          // let titleIndex = (groupIndex + 1) + '. ';
          let titleIndex = (groupIndex + 1);
          
          $(groupData).find('.form-title').prepend('<span class="title-index">'+titleIndex+'</span>');
          
          if (groupIndex != 0) {
              $(groupData).find('[data-append="delete"]').closest('.form-row').removeClass('d-none');
          }
          
          $(groupData).find('.form-group').each(function (key, value) {
              let groupEvent = $(this);
              
              $(groupEvent).find('[name]').each(function (key, value) {
                  let groupName = $(this);
                  let appendName = $(groupName).attr('name').replace('[', '['+groupIndex+'][');
                  let appendIndex = $(groupName).attr('id');
                  
                  $(groupName).attr('name', appendName);
                  
                  if (appendIndex) {
                      $(groupName).attr('id', appendIndex+'-'+groupIndex);
                      $(groupName).next('label').attr('for', appendIndex+'-'+groupIndex);
                  }
              });
          });
      });
      
      let appendClone = $(appendEvent).children('.form-container').first().clone();
      
      $(appendEvent).append('<div class="form-row '+appendHide+'"><div class="form-group text-right col-md-12 data-append-button " ><button type="button" class="btn btn-success radius-30  " data-append="add"><i class="fa-solid fa-plus"></i> Add More</button></div></div>');
      
      $(appendEvent).on('click', '[data-append="add"]', function (event) {
          event.preventDefault();
          
          let addEvent = $(this);
          
          if (appendCount < appendLimit) {
              $(appendClone).find('select.select2-hidden-accessible').removeAttr('data-live-search');
              $(appendClone).find('select.select2-hidden-accessible').removeAttr('data-select2-id');
              $(appendClone).find('select.select2-hidden-accessible').find('option').removeAttr('data-select2-id');
              
              $(addEvent).closest('.form-append').children('.form-container').last().after(appendClone.clone());
              
              $(appendEvent).find('.form-title').each(function (index, data) {
                  let titleEvent = $(this);
                  // let titleIndex = (index + 1) + '. ';
                  let titleIndex = (index + 1);
                  
                  $(titleEvent).find('.title-index').html(titleIndex);
              });
              
              $(addEvent).closest('.form-append').children('.form-container').last().find('.form-group').each(function (key, value) {
                  let groupEvent = $(this);
                  
                  $(groupEvent).find('[name]').each(function (key, value) {
                      let groupName = $(this);
                      let appendName = $(groupName).attr('name').replace('[0]', '['+appendLength+']');
                      let appendIndex = $(groupName).attr('id');
                      
                      $(groupName).attr('name', appendName);
                      
                      if (appendIndex) {
                          appendIndex = appendIndex.replace(/0$/g, appendLength);
                          
                          $(groupName).attr('id', appendIndex);
                          $(groupName).next('label').attr('for', appendIndex);
                      }
                  });
                  
                  formReset(groupEvent);
              });
              
              $(addEvent).closest('.form-append').children('.form-container').last().append('<div class="form-row"><div class="form-group text-right col-md-12 "><button type="button" class="btn btn-danger radius-30" data-append="remove"><i class="fa-solid fa-minus"></i> Remove</button></div></div>');
              
              appendLength++;
              appendCount++;
          } else {
              $.alert({
                  'title': 'Alert!',
                  'content': 'Can not add more then '+appendLimit+' rows!',
                  'type': 'yellow',
                  'draggable': false,
                  'animation': 'none',
                  'closeAnimation': 'none',
                  'closeIcon': true,
                  'typeAnimated': false,
                  'animateFromElement': false,
                  'backgroundDismiss': false,
                  'backgroundDismissAnimation': '',
                  'closeIconClass': 'fa-solid fa-times text-sm',
                  'buttons': {
                      'close': {
                          'text': '<i class="fa-solid fa-times"></i> Close',
                          'btnClass': 'btn-blue ripple',
                      },
                  },
              });
          }
      });
      
      $(appendEvent).on('click', '[data-append="remove"]', function (event) {
          event.preventDefault();
          
          let removeEvent = $(this);
          
          $.confirm({
              'title': 'Confirm!',
              'content': 'Are you sure want to remove this!',
              'type': 'red',
              'draggable': false,
              'animation': 'none',
              'closeAnimation': 'none',
              'closeIcon': true,
              'typeAnimated': false,
              'animateFromElement': false,
              'backgroundDismiss': false,
              'backgroundDismissAnimation': '',
              'closeIconClass': 'fa-solid fa-times text-sm',
              'buttons': {
                  'confirm': {
                      'text': '<i class="fa-solid fa-check"></i> Confirm',
                      'btnClass': 'btn-green ripple',
                      'action': function (event) {
                          $(removeEvent).closest('.form-container').remove();
                          
                          $(appendEvent).find('.form-title').each(function (index, data) {
                              let titleEvent = $(this);
                              // let titleIndex = (index + 1) + '. ';
                              let titleIndex = (index + 1);
                              
                              $(titleEvent).find('.title-index').html(titleIndex);
                          });
                          
                          appendCount--;
                      },
                  },
                  'cancel': {
                      'text': '<i class="fa-solid fa-times"></i> Cancel',
                      'btnClass': 'btn-red ripple',
                  },
              },
          });
      });
      
      $(appendEvent).on('click', '[data-append="delete"]', function (event) {
          event.preventDefault();
          
          let deleteEvent = $(this);
          let deleteUrl = $(deleteEvent).attr('data-route');
          let deleteTable = $(deleteEvent).closest('#form-modal').attr('data-table-ajax');
          
          $.confirm({
              'title': 'Confirm!',
              'content': 'Are you sure want to delete this!',
              'type': 'red',
              'draggable': false,
              'animation': 'none',
              'closeAnimation': 'none',
              'closeIcon': true,
              'typeAnimated': false,
              'animateFromElement': false,
              'backgroundDismiss': false,
              'backgroundDismissAnimation': '',
              'closeIconClass': 'fa-solid fa-times text-sm',
              'buttons': {
                  'confirm': {
                      'text': '<i class="fa-solid fa-check"></i> Confirm',
                      'btnClass': 'btn-green ripple',
                      'action': function (event) {
                    $.ajax({
                        'url': deleteUrl,
                        'type': 'post',
                        'dataType': 'json',
                        'cache': false,
                        'success': function (response) {
                            console.log(response);
                            
                                  if (response.status == 'success') {
                                      $(deleteEvent).closest('.form-container').remove();
                                      
                                      $(appendEvent).find('.form-title').each(function (index, data) {
                                          let titleEvent = $(this);
                                          // let titleIndex = (index + 1) + '. ';
                                          let titleIndex = (index + 1);
                                          
                                          $(titleEvent).find('.title-index').html(titleIndex);
                                      });
                                  
                                      if (deleteTable) {
                                          dataDraw(deleteTable);
                                      }
                                  
                                  showToast(response.message, response.status);
                                      
                                      appendCount--;
                                  } else if (response.status == 'error') {
                                      showToast(response.message, response.status);
                                  }
                        },
                        'error': function (error) {
                            console.error(error);
                        },
                    });
                      },
                  },
                  'cancel': {
                      'text': '<i class="fa-solid fa-times"></i> Cancel',
                      'btnClass': 'btn-red ripple',
                  },
              },
          });
      });
  });
}

function dataAppend1() {
  $.initialize('.form-append1', function () {
    let appendEvent = $(this);
      let appendLength = $(appendEvent).children('.form-container1').length;
      let appendCount = $(appendEvent).children('.form-container1').length;
    let appendType = $(appendEvent).attr('data-append1');
    let appendLimit = $(appendEvent).attr('data-limit1');
    let appendHide = appendType == 'false' ? 'd-none' : '';
    
      appendLimit = appendLimit ? appendLimit : 100;
      
      $(appendEvent).children('.form-container1').each(function (index, data) {
          let groupData = data;
          let groupIndex = index;
          // let titleIndex = (groupIndex + 1) + '. ';
          let titleIndex = (groupIndex + 1);
          
          // console.log(groupIndex)
          $(groupData).find('.form-title1').prepend('<span class="title-index1">'+titleIndex+'</span>');
          
          if (groupIndex != 0) {
              $(groupData).find('[data-append1="delete"]').closest('.form-row').removeClass('d-none');
          }
          
          $(groupData).find('.form-group').each(function (key, value) {
              let groupEvent = $(this);
              
              $(groupEvent).find('[name]').each(function (key, value) {
                  let groupName = $(this);
                  let appendName = $(groupName).attr('name').replace('[companion]', '[companion]['+groupIndex+']');
                  let appendIndex = $(groupName).attr('id');
                  $(groupName).attr('name', appendName);
                  
                  if (appendIndex) {
                      $(groupName).attr('id', appendIndex+'-'+groupIndex);
                      $(groupName).next('label').attr('for', appendIndex+'-'+groupIndex);
                  }
              });
          });
      });
      
      let appendClone = $(appendEvent).children('.form-container1').first().clone();
      
      $(appendEvent).append('<div class="col-md-12 mb-3 text-right '+appendHide+'"><div class="form-group"><button type="button" class="btn btn-green ripple" data-append1="add"><i class="fa-solid fa-plus"></i> Add Companion</button></div></div>');
      
      $(appendEvent).on('click', '[data-append1="add"]', function (event) {
          event.preventDefault();
          
          let addEvent1 = $(this);
          
          if (appendCount < appendLimit) {
              $(appendClone).find('select.select2-hidden-accessible').removeAttr('data-live-search');
              $(appendClone).find('select.select2-hidden-accessible').removeAttr('data-select2-id');
              $(appendClone).find('select.select2-hidden-accessible').find('option').removeAttr('data-select2-id');
              
              $(addEvent1).closest('.form-append1').children('.form-container1').last().after(appendClone.clone());
              
              $(appendEvent).find('.form-title1').each(function (index, data) {
                  let titleEvent = $(this);
                  // let titleIndex = (index + 1) + '. ';
                  let titleIndex = (index + 1);
                  
                  $(titleEvent).find('.title-index1').html(titleIndex);
              });
              
              $(addEvent1).closest('.form-append1').children('.form-container1').last().find('.form-group').each(function (key, value) {
                  let groupEvent = $(this);
                  
                  $(groupEvent).find('[name]').each(function (key, value) {
                      let groupName = $(this);
                      let appendName = $(groupName).attr('name').replace('[companion][0]', '[companion]['+appendLength+']');
                      let appendIndex = $(groupName).attr('id');
                      
                      $(groupName).attr('name', appendName);
                      
                      if (appendIndex) {
                          appendIndex = appendIndex.replace(/0$/g, appendLength);
                          
                          $(groupName).attr('id', appendIndex);
                          $(groupName).next('label').attr('for', appendIndex);
                      }
                  });
                  
                  formReset(groupEvent);
              });
              
              $(addEvent1).closest('.form-append1').children('.form-container1').last().append('<div class="form-row"><div class="form-group text-right col-md-12"><button type="button" class="btn btn-red ripple" data-append1="remove"><i class="fa-solid fa-minus"></i> Remove Companion</button></div></div>');
              
              appendLength++;
              appendCount++;
          } else {
              $.alert({
                  'title': 'Alert!',
                  'content': 'Can not add more then '+appendLimit+' rows!',
                  'type': 'yellow',
                  'draggable': false,
                  'animation': 'none',
                  'closeAnimation': 'none',
                  'closeIcon': true,
                  'typeAnimated': false,
                  'animateFromElement': false,
                  'backgroundDismiss': false,
                  'backgroundDismissAnimation': '',
                  'closeIconClass': 'fa-solid fa-times text-sm',
                  'buttons': {
                      'close': {
                          'text': '<i class="fa-solid fa-times"></i> Close',
                          'btnClass': 'btn-blue ripple',
                      },
                  },
              });
          }
      });
      
      $(appendEvent).on('click', '[data-append1="remove"]', function (event) {
          event.preventDefault();
          
          let removeEvent = $(this);
          
          $.confirm({
              'title': 'Confirm!',
              'content': 'Are you sure want to remove this!',
              'type': 'red',
              'draggable': false,
              'animation': 'none',
              'closeAnimation': 'none',
              'closeIcon': true,
              'typeAnimated': false,
              'animateFromElement': false,
              'backgroundDismiss': false,
              'backgroundDismissAnimation': '',
              'closeIconClass': 'fa-solid fa-times text-sm',
              'buttons': {
                  'confirm': {
                      'text': '<i class="fa-solid fa-check"></i> Confirm',
                      'btnClass': 'btn-green ripple',
                      'action': function (event) {
                          $(removeEvent).closest('.form-container1').remove();
                          
                          $(appendEvent).find('.form-title1').each(function (index, data) {
                              let titleEvent = $(this);
                              // let titleIndex = (index + 1) + '. ';
                              let titleIndex = (index + 1);
                              
                              $(titleEvent).find('.title-index1').html(titleIndex);
                          });
                          
                          appendCount--;
                      },
                  },
                  'cancel': {
                      'text': '<i class="fa-solid fa-times"></i> Cancel',
                      'btnClass': 'btn-red ripple',
                  },
              },
          });
      });
      
      $(appendEvent).on('click', '[data-append1="delete"]', function (event) {
          event.preventDefault();
          
          let deleteEvent = $(this);
          let deleteUrl = $(deleteEvent).attr('data-route');
          let deleteTable = $(deleteEvent).closest('#form-modal').attr('data-table-ajax');
          
          $.confirm({
              'title': 'Confirm!',
              'content': 'Are you sure want to delete this!',
              'type': 'red',
              'draggable': false,
              'animation': 'none',
              'closeAnimation': 'none',
              'closeIcon': true,
              'typeAnimated': false,
              'animateFromElement': false,
              'backgroundDismiss': false,
              'backgroundDismissAnimation': '',
              'closeIconClass': 'fa-solid fa-times text-sm',
              'buttons': {
                  'confirm': {
                      'text': '<i class="fa-solid fa-check"></i> Confirm',
                      'btnClass': 'btn-green ripple',
                      'action': function (event) {
                    $.ajax({
                        'url': deleteUrl,
                        'type': 'post',
                        'dataType': 'json',
                        'cache': false,
                        'success': function (response) {
                            console.log(response);
                            
                                  if (response.status == 'success') {
                                      $(deleteEvent).closest('.form-container1').remove();
                                      
                                      $(appendEvent).find('.form-title1').each(function (index, data) {
                                          let titleEvent = $(this);
                                          // let titleIndex = (index + 1) + '. ';
                                          let titleIndex = (index + 1);
                                          
                                          $(titleEvent).find('.title-index1').html(titleIndex);
                                      });
                                  
                                      if (deleteTable) {
                                          dataDraw(deleteTable);
                                      }
                                  
                                  showToast(response.message, response.status);
                                      
                                      appendCount--;
                                  } else if (response.status == 'error') {
                                      showToast(response.message, response.status);
                                  }
                        },
                        'error': function (error) {
                            console.error(error);
                        },
                    });
                      },
                  },
                  'cancel': {
                      'text': '<i class="fa-solid fa-times"></i> Cancel',
                      'btnClass': 'btn-red ripple',
                  },
              },
          });
      });
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


(function() {
  'use strict';

 
  function enableFormValidation() {
      var forms = document.querySelectorAll('.needs-validation');
      
      Array.prototype.slice.call(forms)
          .forEach(function(form) {
              form.addEventListener('submit', function(event) {
                  if (!form.checkValidity()) {
                      event.preventDefault();
                      event.stopPropagation();
                  }
                  form.classList.add('was-validated');
              }, false);
          });
  }

 
  document.addEventListener('DOMContentLoaded', function() {
      enableFormValidation();
  });
})()

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const imagePreview = document.getElementById("imagePreview");
        imagePreview.src = reader.result;
        imagePreview.style.display = "block"; // Show image preview
    }
    reader.readAsDataURL(event.target.files[0]); // Convert file to base64 URL
}




// document.addEventListener("DOMContentLoaded", function () {

//     document.querySelectorAll(".form-check-all").forEach(mainCheckbox => {
       
//         mainCheckbox.addEventListener("change", function () {
//             let table = this.closest("table");
//             let checkboxes = table.querySelectorAll(".form-check-this");
//             checkboxes.forEach(checkbox => checkbox.checked = this.checked);
//         });
//     });

//     document.querySelectorAll(".form-check-this").forEach(rowCheckbox => {
//         rowCheckbox.addEventListener("change", function () {
//             let table = this.closest("table");
//             let mainCheckbox = table.querySelector(".form-check-all");
//             let allChecked = table.querySelectorAll(".form-check-this:checked").length === table.querySelectorAll(".form-check-this").length;
//             mainCheckbox.checked = allChecked;
//         });
//     });
// });
