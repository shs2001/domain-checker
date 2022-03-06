$(document).ready(function () {
    $(".result").hide();
    $(".domain-input").focus();
    var input = $(".domain-input");
    $("#checkbtn").prop("disabled",true);

    input.keydown(function () { 
        if(input.val().length > 0){
            $("#checkbtn").prop("disabled",false);
        }else{
            $("#checkbtn").prop("disabled",true);
        }
    });

    $("#searchForm").on("submit",function(e){
        e.preventDefault();
        $(".result").hide('100');
        $("#checkbtn").prop("disabled",true).css('cursor','progress');
        if(input.val() == ""){
            $(input).addClass("animated shake error");
            setTimeout(() => {
                $(input).removeClass("shake");
            }, 2000);
        }else{
            $("#checkbtn").html('<i class="fa fa-spinner fa-spin"></i>');
            $.ajax({
                type: "get",
                url: "https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_hpubyIIfPK8LOCcXKYYOTNSRqKLNf&domainName="+input.val(),
                success: function (response) {
                    // UNAVAILABLE
                    // AVAILABLE
                    if(response.DomainInfo.domainAvailability == "UNAVAILABLE"){
                        $(".result").html("<p><strong class='red'>"+response.DomainInfo.domainName+"</strong> is not available!</p>");
                    }else{
                        var url = "https://www.domain.com/registration/?flow=domainDFE&search="+response.DomainInfo.domainName;
                        $(".result").html("<p><strong class='green'>"+response.DomainInfo.domainName+"</strong> is available! <a href="+url+" target='_blank'>Buy Now</p>");
                    }
                    $("#checkbtn").html('<i class="fa fa-search"></i>');
                    $(".result").show('100');
            
                }
            });
        }
    })
});