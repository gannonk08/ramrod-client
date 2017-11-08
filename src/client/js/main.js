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


                //    offer only drill down
                $( ".offerRow" ).click(function(e) {
                    var selected = $(this).hasClass("highlighted");
                    $(".offerRow").removeClass("highlighted");
                    if(!selected) {
                        $(this).addClass("highlighted");
                    }

                    var offerId = this.getAttribute('id');
                    var offerOnlyUrl = `http://localhost:3000/offerOnlyDrill/${pubId}?dateOne=${dayOneDate}&dateTwo=${dayTwoDate}&offerId=${offerId}`;
                    $.ajax({url: offerOnlyUrl, success: function(res)
                    {
                        $("#secTables").replaceWith(res);
                        $( ".offerRow" ).addClass("highlighted");
                    }
                    });

                });

                //    offer only drill down
                $( ".platformRow" ).click(function(e) {
                    var selected = $(this).hasClass("highlighted");
                    $(".platformRow").removeClass("highlighted");
                    if(!selected) {
                        $(this).addClass("highlighted");
                    }

                    var platformId = this.getAttribute('id');
                    var platformOnlyUrl = `http://localhost:3000/platformOnlyDrill/${pubId}?dateOne=${dayOneDate}&dateTwo=${dayTwoDate}&platformId=${platformId}`;
                    $.ajax({url: platformOnlyUrl, success: function(res)
                    {
                        $("#secTables").replaceWith(res);
                        $( ".platformRow" ).addClass("highlighted");
                    }
                    });

                });

                //    geo only drill down
                $( ".geoRow" ).click(function(e) {
                    var selected = $(this).hasClass("highlighted");
                    $(".geoRow").removeClass("highlighted");
                    if(!selected) {
                        $(this).addClass("highlighted");
                    }
                    var iso = this.getAttribute('id');

                    var geoOnlyUrl = `http://localhost:3000/geoOnlyDrill/${pubId}?dateOne=${dayOneDate}&dateTwo=${dayTwoDate}&iso=${iso}`;
                    $.ajax({url: geoOnlyUrl, success: function(res)
                    {
                        $("#secTables").replaceWith(res);
                        $( ".geoRow" ).addClass("highlighted");

                    }
                    });

                });

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

                        //    geo drill down
                        $( ".geoRow" ).click(function(e) {
                            var selected = $(this).hasClass("highlighted");
                            $(".geoRow").removeClass("highlighted");
                            if(!selected) {
                                $(this).addClass("highlighted");
                            }
                            var iso = this.getAttribute('id');

                            var netUrl = `http://localhost:3000/geoDrill/${pubId}?dateOne=${dayOneDate}&dateTwo=${dayTwoDate}&iso=${iso}&advId=${advId}`;
                            $.ajax({url: netUrl, success: function(res)
                            {
                                $("#secTables").replaceWith(res);
                                $( ".geoRow" ).addClass("highlighted");
                                $( ".netRow" ).addClass("highlighted");

                            }
                            });

                        });

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
                                $( ".netRow" ).addClass("highlighted");

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
