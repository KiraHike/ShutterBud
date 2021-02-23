var $pageLanding = document.querySelector('#page-landing');
var $pagePlan = document.querySelector('#page-plan');
var $pageList = document.querySelectorAll('.container.view');

function viewPage(page) {
  for (var i = 0; i < $pageList.length; i++) {
    if ($pageList[i] === page) {
      console.log($pageList[i]);
      $pageList[i].className = 'container view';
    } else {
    $pageList[i].className = 'container view hidden';
    }
  }
}
