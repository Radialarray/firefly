var backgroundSound = new Howl({
    src: ['audio/waldrauschenStereo.wav'],
    autoplay: true,
    loop: true,
    volume: 0.1,
    preload: true,
    onload: function() {
     console.log('Finished!');
     return true;
 }
  });

var backgroundPan = new Howl({
    src: ['audio/waldrauschenBirds.wav'],
    autoplay: true,
    loop: true,
    volume: 0.05,
    preload: true,
    onload: function() {
     console.log('Finished!');
     return true;
 }
});

// var smack1 = new Howl({
//     src: ['audio/noise1.mp3'],
//     volume: 0.5,
// })
//
// var smack2 = new Howl({
//     src: ['audio/noise2.mp3'],
//     volume: 0.5,
// })
//
// var smack3 = new Howl({
//     src: ['audio/noise3.mp3'],
//     volume: 0.5,
// })


var howls = [];
howls[0] =  smack1 = new Howl({
        src: ['audio/noise1.mp3'],
        volume: 0.5,
    })

howls[1] =
    smack2 = new Howl({
        src: ['audio/noise2.mp3'],
        volume: 0.5,
    })

howls[2] =
    smack3 = new Howl({
        src: ['audio/noise3.mp3'],
        volume: 0.5,
    })
