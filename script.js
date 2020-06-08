'use strict'


function catchResponce() {
    $('#repoSearchForm').submit(function( event ) {
        event.preventDefault();
        $( ".results" ).replaceWith(`
    <section class="results"><p class="errorBlock"></p><ul></ul></section>`);
        let formInput = $( "input[type=text][name=gitHandle]" ).val();
        fetchData(formInput);
      });
    
}

function fetchData(formInput) {
    //takes input, fetches handles from API
    fetch(`https://api.github.com/users/${formInput}/repos?`, {
        headers: {
            'Accept': 'application/vnd.github.nebula-preview+json'
          },
    })
    
    .then(res => {
        if (!res.ok) {
            return res.json().then(json => {
                throw new Error(json.message);
            });
        }
    
        return res.json();
    })
      .then(responceJson => {
        printResults(responceJson, formInput)
      })
      .catch(err => {
        $('.errorBlock').replaceWith(`<p class="errorBlock">Something went wrong: ${err.message}</p>`);
      });
  }

function printResults(responceJson, formInput) {
    responceJson.forEach(element => 
        $( ".results>ul" ).append(`<li><a target="_blank" href="https://github.com/${formInput}/${element.name}" >${element.name}</a></li>`)
        );
    console.log('GENERATOR RAN, json: '+ responceJson);
}

function logicBoot () {
    catchResponce();
}
$(logicBoot());