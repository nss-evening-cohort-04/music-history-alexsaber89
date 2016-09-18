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

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

songs.unshift("Postpartum - by Taylor McFerrin on the album Early Riser");
songs.push("Perpetual Black Second - by Meshuggah on the album Nothing");

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
