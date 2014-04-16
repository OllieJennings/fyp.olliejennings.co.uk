var vis = {};
vis.begin = {};


vis.mappings = {};
vis.mappings.circles = {
  "18": {
    energy: {
      upper: 1,
      lower: 0.8
    },
    valence: {
      upper: 0.55,
      lower: 0.45
    }
  },
  "25": {
    energy: {
      upper: 0.8,
      lower: 0.6
    },
    valence: {
      upper: 0.55,
      lower: 0.45
    }
  },
  "3": {
    energy: {
      upper: 0.6,
      lower: 0.55
    },
    valence: {
      upper: 0.55,
      lower: 0.45
    }
};

// the rest come from a request in the server



vis.init = function (songArr) {
  if (assert.isArr(songArr) && !assert.isEmptyArr(songArr)) {
    console.log('The song array has been accepted into the visualisation engine, the visualisaiton is commensing');
    vis.songList = songArr;
    vis.begin.render();
    return true;
  }
  return false;
};




vis.begin.render = function () {
  if (assert.isArr(vis.songList) && !assert.isEmptyArr(vis.songList)) {
    // loop through each circle
    for (i = 0; i < 26; i++) {
      vis.begin.circles(i);
    }
  }
  return false;
};


vis.begin.circles = function (index) {
  var circle = $('.c' + index),
      dimension;

  if (!assert.isEmptyArr(circle)) {
    // then we have the circle
    circle.append("<div class='innerCircle'></div>");
    dimension = vis.matchSongs(index);

    circle.children().first().css("height", dimension+"%");
    circle.children().first().css("width", dimension+"%");
    circle.children().first().css('margin', '-'+(dimension/2)+"% 0 0 -"+(dimension/2)+"%");

  }
};



vis.matchSongs = function (circle) {
  var circleObj = vis.mappings.circles[""+circle],
      matched = 0;

  for (i = 0; i < vis.songList.length(); i++) {
    // loop through each song
    if ((circleObj.energy.upper >= vis.songList[i].energy) && (circleObj.energy.lower <= vis.songList[i].energy) && (circleObj.valence.upper >= vis.songList[i].valence) && (circleObj.valence.lower <= vis.songList[i].valence)) {
      // we have a match
      matched += 1;
    }
  }


  // so done all matches for spcific mood
  return matched;
};
