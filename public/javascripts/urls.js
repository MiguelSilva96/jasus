
$(document).ready(function () {
  $('.toast').toast({ delay: 2000 });
});

function copyUrl() {
  navigator.clipboard.writeText($("#urlRef").text())
  $('.toast').toast('show');
}