var base_api_url = "http://" + window.location.host;

function AppViewModel() {
    var self=this;
    self.jobOffers=ko.observableArray([])
    self.searchBy = ko.observable("users");

    self.refresh = function(){
        $.ajax({
            url: base_api_url+"/joboffer",
            type: "GET",
            crossDomain:true,
            success: function(data, status, xhr) {
                console.log("success: "+data + ", "+status+", "+JSON.stringify(xhr));
                if(status!=="success"){
                    alert(JSON.stringify(data));
                }else{
                    console.log(data)
                    self.jobOffers.removeAll()
                    for(let index in data.data){
                        self.jobOffers.push(data.data[index]);
                    }
                }
            },
            error: function(data, status, xhr) {
                alert(JSON.stringify(data));
                console.log("error: "+JSON.stringify(data)+":"+status+":"+xhr);
            }
        });
    }
};

var appViewModel = new AppViewModel()
appViewModel.refresh()

ko.applyBindings(appViewModel);

$("#userSearchBtn").click(function() {
    let name =  $("#searchUserName").val().trim();
    let interestedAreas =  $("#searchUserInterestedAreas").tagsinput("items");
    let userType =  $("#searchUserType").val();

    let requestParams = {};

    if (name.length > 0) {
        requestParams["name"] = name;
    }
    if (interestedAreas.length > 0) {
        requestParams["interestedAreas"] = interestedAreas;
    }
    if (userType != "null") {
        requestParams["userType"] = userType;
    }

    $.ajax({
        url: base_api_url + "/profile/search",
        type: "GET",
        data: requestParams,
        crossDomain: true,
        success: function (data, status, xhr) {
            console.log(data);
            console.log(status);
        },
        error: function(data, status, xhr) {
            console.log(data.responseText);
            console.log(status);
            alert("Some error occurred while searching for users. Try again later.")
        }
    });
});

function showModal(job){
    $("#modalTitle").text(job.title);
    $("#modalArea").text(job.area);
    $("#modalAmount").text(job.amount);
    $("#modalDescription").text(job.description);
    $("#modalDate").text(job.date);
    $("#modalCreatorName").text(job.creator.name);
    $("#modalCreatorUsername").text(job.creator.username);
    $("#modalCreatorEmail").text(job.creator.email);
}

$(document).ready(function(e){    
    
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
            e.preventDefault();
            var param = $(this).attr("href").replace("#","");
            var concept = $(this).text();
            $('.search-panel span#search_concept').text(concept);
            $('.input-group #search_param').val(param);
    });
});
