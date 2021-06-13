$(function(){
    loadRecipies();
    $("#recipes").on("click","#delbtn",handleDelete);
     $("#recipes").on("click","#editbtn",handleUpdate);
    $("#addBtn").click(addRecipe);
    $("#updateSave").click(function(){
        var id = $("#updateID").val();
        var title = $("#updateTitle").val();
        var body = $("#updateBody").val();
        $.ajax({
            url :"https://usman-recipes.herokuapp.com/api/recipes/"+id,
            data : {title, body},
            method : "PUT",
            success : function(response){
                loadRecipies();
                console.log(response);
            }
        });
    });
});

function handleUpdate(){
    
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.get("https://usman-recipes.herokuapp.com/api/recipes/"+id, function(response){
        $("#updateID").val(response._id);
        $("updateTitle").val(response.title);
        $("#updateBody").val(response.body);
        $("#updateModal").modal("show");
    });

}


function addRecipe(){
    var title =$("#title").val();
    var body = $("#body").val(); 
    $.ajax({
        url : "https://usman-recipes.herokuapp.com/api/recipes",
        data : {title , body},
        method : "POST",
        success : function(response){
            console.log(response);
            loadRecipies();
        }
    })
}

function handleDelete(){
    
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    console.log(id);
    //console.log("Handle Delete");
    $.ajax({
        url : "https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method : "DELETE",
        success : function(){
            loadRecipies();
        }
    })
}

function loadRecipies(){
    $.ajax({
        url : "https://usman-recipes.herokuapp.com/api/recipes",
        method : "GET",
        error : function (response){
            var recipes = $("#recipes");
             recipes.empty();
             recipes.append("<h2>An error has occured</h2>");
             recipes.append("<h1 id = 'err'>404 not found</h1>");
        },
        success : function(response){
            console.log(response);
            var recipes = $("#recipes");
            recipes.empty();
            for(var i = 0 ; i < response.length; i++){
                var rec = response[i];
             // recipes.append("<div><h3>"+rec.title+"</h3></div>");
                recipes.append(`<div class = "recipe"  data-id = "${rec._id}"><h3>+${rec.title}+</h3><p><button id = "delbtn" class = "btn btn-danger btn-sm" float-right>Delete</button><button id = "editbtn" class = "btn  btn-sm">Edit</button>${rec.body}</p></div>`);
            }

        }
    });
}

