'use strict'


function catchResponce() {
    $('#repoSearchForm').submit(function( event ) {
        event.preventDefault();
        $( ".results" ).replaceWith(`
    <section class="results"><ul></ul></section>`);
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
    
    .then(response => {
        if (!response.ok) {
            throw Error(error);
        }
        return response.json();
      })
      .then(responceJson => {
        printResults(responceJson)
      })
      .catch(error => console.error());
    console.log('FETCHER RAN, value:'+ formInput);
    }

function printResults(responceJson) {
    responceJson.forEach(element => 
        $( ".results>ul" ).append(`<li><a target="_blank" href="https://github.com/maksimsavi/${element.name}" >${element.name}</a></li>`)
        );
    console.log('GENERATOR RAN, json: '+ responceJson);
}

function logicBoot () {
    catchResponce();
}
$(logicBoot());