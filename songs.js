function activateListView() {
  document.getElementById("list-music-view").style.display = "block";
  document.getElementById("add-music-view").style.display = "none";
}

function activateAddView() {
  document.getElementById("add-music-view").style.display = "flex";
  document.getElementById("list-music-view").style.display = "none";
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
  songListDiv.innerHTML = "";
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
  songListDiv.innerHTML = musicContentDivs;
  songListDiv.scrollTop = songListDiv.scrollHeight;
}

function collectUserInput() {
  var userInputSongName = document.getElementById("song-name");
  var userInputArtist = document.getElementById("artist");
  var userInputAlbum = document.getElementById("album");
  var userInputObject = {
    "song_name": userInputSongName.value,
    "artist_name": userInputArtist.value,
    "album_name": userInputAlbum.value,
    "id": counter
  }
  counter++;
  musicObjectsArray.push(userInputObject);
  populateSongDiv(musicObjectsArray);
  console.log("User input added to array/DOM: ",musicObjectsArray);
  userInputSongName.value = "";
  userInputArtist.value = "";
  userInputAlbum.value = "";
  activateListView();
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

//On page load, activate the list view
activateListView();
document.getElementById("list-view-btn").addEventListener("click", activateListView);
document.getElementById("add-view-btn").addEventListener("click", activateAddView);
document.getElementById("add-btn").addEventListener("click", collectUserInput);
document.querySelector("body").addEventListener("click", function() {
  if (event.target.classList[0] === "delete") {
    deleteObjectFromDOMAndArray(event.target);
  }
});

var musicObjectsArray = [];
var songListDiv = document.getElementById("song_list_id");
var counter = 0;


var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", parseJSON);
myRequest.open("GET", "songList.json");
myRequest.send();

//RegEx stuff (not sure if needed?)
// songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
// songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
// songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
// songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
// songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

// songs.unshift("Postpartum - by Taylor McFerrin on the album Early Riser");
// songs.push("Perpetual Black Second - by Meshuggah on the album Nothing");

  // songs[i] = songs[i].replace(/\*/g, "");
  // songs[i] = songs[i].replace(/\(/g, "");
  // songs[i] = songs[i].replace(/@/g,"");
  // songs[i] = songs[i].replace(/!/g,"");
  // songs[i] = songs[i].replace(/>/g," - ");