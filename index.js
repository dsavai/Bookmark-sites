document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(event){
    event.preventDefault();
    var siteName = document.getElementById("name").value;
    var siteUrl = document.getElementById("url").value;
    var errorName = document.getElementById("errorName");
    var errorUrl = document.getElementById("errorUrl");
    var errorValidUrl = document.getElementById("errorUrl");

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if(siteName === ""){
        errorName.innerHTML = "Please enter site name";
        return false
    }

    errorName.innerHTML = "";

    if(siteUrl === ""){
        errorUrl.innerHTML = "Please enter site url";
        return false
    }

    errorName.innerHTML = "";

    if(!validateUrl(siteUrl)){
        errorValidUrl.innerHTML = "Please enter a valid site url";
        return false
    }
    //validateUrl(siteUrl)

    if(localStorage.getItem("bookmarks") === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }else{
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    fetchBookmarks();
}

function fetchBookmarks(){
    var bookmarks =  JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarkResults = document.getElementById("results");
    bookmarkResults.innerHTML = "";

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarkResults.innerHTML += '<li>'+'<h3>'+name+'</h3>'+'<a href='+url+' target="_blank">'+url+'</a>'+'</li>'
    }
}



function validateUrl(url){
    var urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    var urlMatch = urlRegex.test(url);
    return urlMatch;
}
