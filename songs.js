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
  var newSongString = userInputSongName.value + " - by " + userInputArtist.value + " on the album " + userInputAlbum.value;
  songs.push(newSongString);
  songListDiv.innerHTML += "<p>" + newSongString + "</p>";
  userInputSongName.value = "";
  userInputArtist.value = "";
  userInputAlbum.value = "";
  activateListView();
}

activateListView();
document.getElementById("list-view-btn").addEventListener("click", activateListView);
document.getElementById("add-view-btn").addEventListener("click", activateAddView);
document.getElementById("add-btn").addEventListener("click", collectUserInput);

var songs = [];
var songListDiv = document.getElementById("song_list_id");

for (var i = 0; i < songs.length; i++) {
  songs[i] = songs[i].replace(/\*/g, "");
  songs[i] = songs[i].replace(/\(/g, "");
  songs[i] = songs[i].replace(/@/g,"");
  songs[i] = songs[i].replace(/!/g,"");
  songs[i] = songs[i].replace(/>/g," - ");
  console.log(songs[i]);
  songListDiv.innerHTML += "<p>" + songs[i] + "</p>";
}