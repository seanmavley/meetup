$(document).foundation();

// Code below adapted from: http://codepen.io/greenido/pen/qOEbGp
//
// Check if we can get geo location and show it on a map in case we can.
//
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    var status = document.getElementById("locationError");
    status.style.display = 'block';
  }
}

function showPosition(position) {
  console.log('showPosition I am in action');
  var geoPoint = position.coords.latitude + "," + position.coords.longitude;
  console.log(position.coords.latitude + ' ' + position.coords.longitude);
  document.getElementById('location').value = position.coords.latitude + ', ' + position.coords.longitude;
}

// show our errors for debuging
function showError(error) {
  var x = document.getElementById("status");
  x.style.color = 'red';
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "Denied the request for Geolocation. Maybe, ask the user in a more polite way?"
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred :(";
      break;
  }
};

$(function() {
  // implementation of disabled form fields
  var nowTemp = new Date();
  var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
  var start_date = $('#dateOne').fdatepicker({
    format: 'mm-dd-yy hh:ii',
    pickTime: true,
    onRender: function(date) {
      return date.valueOf() < now.valueOf() ? 'disabled' : '';
    }
  }).on('changeDate', function(ev) {
    if (ev.date.valueOf() > end_date.date.valueOf()) {
      var newDate = new Date(ev.date)
      newDate.setDate(newDate.getDate() + 1);
      end_date.update(newDate);
    }
    start_date.hide();
    $('#dateTwo')[0].focus();
  }).data('datepicker');
  var end_date = $('#dateTwo').fdatepicker({
    format: 'mm-dd-yy hh:ii',
    pickTime: true,
    onRender: function(date) {
      return date.valueOf() <= start_date.date.valueOf() ? 'disabled' : '';
    }
  }).on('changeDate', function(ev) {
    end_date.hide();
  }).data('datepicker');
});
