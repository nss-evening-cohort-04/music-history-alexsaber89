function activateListView() {
  document.getElementById("list-music-view").style.display = "block";
  document.getElementById("add-music-view").style.display = "none";
}

function activateAddView() {
  document.getElementById("add-music-view").style.display = "flex";
  document.getElementById("list-music-view").style.display = "none";
}

function collectUserInput() {
  var userInputSongName = document.getElementById("song-name");
  var userInputArtist = document.getElementById("artist");
  var userInputAlbum = document.getElementById("album");
  var userInputObject = {
    "song_name": userInputSongName.value,
    "artist_name": userInputArtist.value,
    "album_name": userInputAlbum.value
  }
  musicObjects.push(userInputObject);
  populateSongDiv(musicObjects);
  userInputSongName.value = "";
  userInputArtist.value = "";
  userInputAlbum.value = "";
  activateListView();
}

function parseJSON() {
  var data = JSON.parse(this.responseText);
  musicObjects = data.songList;
  populateSongDiv(musicObjects);
}

function populateSongDiv(array) {
  songListDiv.innerHTML = "";
  for (var i = 0; i < array.length; i++) {
    songListDiv.innerHTML += "<p>" + array[i].song_name + " by " + array[i].artist_name + " on the album " + array[i].album_name + "</p>";
  }
}

//On page load, activate the list view
activateListView();
document.getElementById("list-view-btn").addEventListener("click", activateListView);
document.getElementById("add-view-btn").addEventListener("click", activateAddView);
document.getElementById("add-btn").addEventListener("click", collectUserInput);

var musicObjects = [];
var songListDiv = document.getElementById("song_list_id");


var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", parseJSON);
myRequest.open("GET", "songList.json");
myRequest.send();

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