var musicObjectsArray = [];
var songListDiv = $('#song_list_id');
var counter = 0;

function activateListView() {
  $('#list-music-view').show();
  $('#add-music-view').hide();
}

function activateAddView() {
  $('#add-music-view').show();
  $('#list-music-view').hide();
}

function parseJSON() {
  var data = JSON.parse(this.responseText);
  musicObjectsArray = data.songList;
  for (var i = 0; i < musicObjectsArray.length; i++) {
    musicObjectsArray[i].id = counter;
    counter++;
  }
  populateSongDiv(musicObjectsArray);
  console.log("JSON loaded: ",musicObjectsArray);
}

function populateSongDiv(array) {
  songListDiv.html("");
  var musicContentDivs = "";
  for (var i = 0; i < array.length; i++) {
    musicContentDivs +=
      "<div class='music-content' id='" + array[i].id + "'>" +
        "<button class='delete'>Delete</button>" +
        "<p>" +
          array[i].song_name +
          " by " +
          array[i].artist_name +
          " on the album " +
          array[i].album_name +
        "</p>" +
      "</div>";
  }
  musicContentDivs += "<button id='more-btn'>More ></button>";
  songListDiv.html(musicContentDivs);
  songListDiv.scrollTop = songListDiv.scrollHeight;
}

function collectUserInput() {
  var userInputSongName = $('#song-name');
  var userInputArtist = $('#artist');
  var userInputAlbum = $('#album');
  var userInputObject = {
    "song_name": userInputSongName.val(),
    "artist_name": userInputArtist.val(),
    "album_name": userInputAlbum.val(),
    "id": counter
  }
  counter++;
  musicObjectsArray.push(userInputObject);
  populateSongDiv(musicObjectsArray);
  console.log("User input added to array/DOM: ",musicObjectsArray);
  userInputSongName.val("");
  userInputArtist.val("");
  userInputAlbum.val("");
  activateListView();
  songListDiv.scrollTop = songListDiv.scrollHeight;
}

function deleteObjectFromDOMAndArray(eventTarget) {
  //first, remove clicked element from the DOM
  songListDiv.removeChild(eventTarget.parentElement);
  console.log("song removed from DOM");

  //then, remove clicked object from the messagesArray
  var clickedID = eventTarget.parentElement.id;
  for (var i = 0; i < musicObjectsArray.length; i++) {
    if (musicObjectsArray[i].id == clickedID) {
      musicObjectsArray.splice(i, 1);
      console.log("Object deleted from array; refreshed array: ",musicObjectsArray);
      break;
    }
  }
}

// function JSON2() {
//   var data = JSON.parse(this.responseText);
//   var JSON2musicObjectsArray = data.songList;
//   for (var i = 0; i < JSON2musicObjectsArray.length; i++) {
//     JSON2musicObjectsArray[i].id = counter;
//     musicObjectsArray.push(JSON2musicObjectsArray[i]);
//     counter++;
//   }
//   populateSongDiv(musicObjectsArray);
//   console.log("JSON2 loaded: ",musicObjectsArray);
// }

//On page load, activate the list view
activateListView();
$("#list-view-btn").click(activateListView);
$("#add-view-btn").click(activateAddView);
$("#add-btn").click(collectUserInput);
document.querySelector("body").addEventListener("click", function() {
  if (event.target.classList[0] === "delete") {
    deleteObjectFromDOMAndArray(event.target);
  } else if (event.target.id === "more-btn") {
    $.ajax({
      type: "GET",
      url: "songList2.json",
      cache: false,
      success: function(data){
        var JSON2musicObjectsArray = data;
        for (var i = 0; i < JSON2musicObjectsArray.length; i++) {
          JSON2musicObjectsArray[i].id = counter;
          musicObjectsArray.push(JSON2musicObjectsArray[i]);
          counter++;
        }
        populateSongDiv(musicObjectsArray);
        console.log("JSON2 loaded: ",musicObjectsArray);
      }
    });
    // var myRequest2 = new XMLHttpRequest();
    // myRequest2.addEventListener("load", JSON2);
    // myRequest2.open("GET", "songList2.json");
    // myRequest2.send();
  }
});

var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", parseJSON);
myRequest.open("GET", "songList1.json");
myRequest.send();
