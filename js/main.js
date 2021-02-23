var $pageLanding = document.querySelector('#page-landing');
var $pagePlan = document.querySelector('#page-plan');

var $header = document.querySelector('h2');

var $navPlan = document.querySelector('.nav.plan');

function viewPlan(event) {
  $pagePlan.className = 'container view';
  $pageLanding.className = 'container view hidden';
  $header.className = 'header view';
  $header.textContent = 'Location';
}

$navPlan.addEventListener('click', viewPlan);
