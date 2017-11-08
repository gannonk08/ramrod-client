(function () {
    "use strict";

    $('#getPubs').click(function(e) {
        e.preventDefault();
        var dayOne = new Date($('#dayOne').val());
        var dayTwo = new Date($('#dayTwo').val());
        var dayOneDate = dayOne.toISOString().slice(0,10);;
        var dayTwoDate = dayTwo.toISOString().slice(0,10);;
        var amId = $('#amId').val();
    var url = `http://localhost:3000/pubs?dateOne=${dayOneDate}&dateTwo=${dayTwoDate}&amId=${amId}`;
    $.ajax({url: url, success: function(result)
    {
    $("#pubTable").replaceWith(result);

        $( ".pubRow" ).click(function(e) {
            var pubId = this.getAttribute('id');
            var pubUrl = `http://localhost:3000/pubDrill/${pubId}?dateOne=${dayOneDate}&dateTwo=${dayTwoDate}&amId=${amId}`;
            $.ajax({url: pubUrl, success: function(res)
            {
                $("#secTables").replaceWith(res);
            }
            });

        });
    }});
  });




})();
