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
            var selected = $(this).hasClass("highlighted");
            $(".pubRow").removeClass("highlighted");
            if(!selected) {
            $(this).addClass("highlighted");
            }

            var pubId = this.getAttribute('id');
            var pubUrl = `http://localhost:3000/pubDrill/${pubId}?dateOne=${dayOneDate}&dateTwo=${dayTwoDate}&amId=${amId}`;
            $.ajax({url: pubUrl, success: function(resPub)
            {
                $("#secTables").replaceWith(resPub);

            //    network drill down
                $( ".netRow" ).click(function(e) {
                    var selected = $(this).hasClass("highlighted");
                    $(".netRow").removeClass("highlighted");
                    if(!selected) {
                        $(this).addClass("highlighted");
                    }

                    var advId = this.getAttribute('id');
                    var netUrl = `http://localhost:3000/netDrill/${pubId}?dateOne=${dayOneDate}&dateTwo=${dayTwoDate}&advId=${advId}`;
                    $.ajax({url: netUrl, success: function(res)
                    {
                        $("#secTables").replaceWith(res);
                        $( ".netRow" ).addClass("highlighted");

                        //    offer drill down
                        $( ".offerRow" ).click(function(e) {
                            var selected = $(this).hasClass("highlighted");
                            $(".offerRow").removeClass("highlighted");
                            if(!selected) {
                                $(this).addClass("highlighted");
                            }

                            var offerId = this.getAttribute('id');
                            var netUrl = `http://localhost:3000/offerDrill/${pubId}?dateOne=${dayOneDate}&dateTwo=${dayTwoDate}&offerId=${offerId}&advId=${advId}`;
                            $.ajax({url: netUrl, success: function(res)
                            {
                                $("#secTables").replaceWith(res);
                                $( ".offerRow" ).addClass("highlighted");
                            }
                            });

                        });
                    }
                    });

                });

            }
            });

        });
    }});
  });




})();
