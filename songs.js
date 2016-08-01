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

