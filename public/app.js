$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#userInput').val();
        //console.log('form submitted with value = ', searchTerm);

        var urlBuild = 'https://gif-app-node-capstone-dobs1211.c9users.io/search/' + searchTerm;
        //console.log('urlBuild = ', urlBuild);

        var result = $.ajax({
                /* update API end point */
                url: urlBuild,
                dataType: 'json',
                /*set the call type GET / POST*/
                type: 'GET'
            })
            /* if the call is successful (status 200 OK) show results */
            .done(function(result) {
                //alert('here');
                /* if the results are meeningful, we can just console.log them */
                //console.log('front-end API call results => ', result);

                $("#result").html('');
                $.each(result, function(key, value) {
                    //console.log('front-end API call results value => ', value);
                    var row = '<div class="gif-image"><a href="' + value.url + '"><img src="http://i.giphy.com/' + value.id + '.gif"> </a></div>';
                    $("#result").append(row);
                });


            })
            /* if the call is NOT successful show errors */
            .fail(function(jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });

    });
});