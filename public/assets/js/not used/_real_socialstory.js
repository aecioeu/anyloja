function get(name) {
    if (typeof Storage !== "undefined") {
        return localStorage.getItem(name);
    } else {
        alert("Please use a modern browser as this site needs localstroage!");
    }
}

function store(name, val) {
    if (typeof Storage !== "undefined") {
        localStorage.setItem(name, val);
    } else {
        alert("Please use a modern browser as this site needs localstroage!");
    }
}

function remove(name) {
    if (typeof Storage !== "undefined") {
        localStorage.removeItem(name);
    } else {
        alert("Please use a modern browser as this site needs localstroage!");
    }
}





(function() {

    // Declare plugin's variables
    var defaults;
    var video;
    var thisTimeline;
    var start = (get('current') ? get('current') : 0);
    var storyTime;
    var storySpinner;
    var active = false;

    this.Story = function() {
        // Default parameters if non provided.
        defaults = {
            playlist: null
        };

        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        try {
            if (defaults.playlist == null || defaults.playlist == '') {
                console.log('[Stories] No playlist.');
                return false;
            }
        } catch (e) {
            console.log(e);
            return false;
        }

        var Div = document.getElementById('storytime');
        // HTML for story popup to be added to page
        var baseHTML = '<div class="storytime" style="opacity: 0; display: none; z-index: 999999;">' +
            '<div class="story-cover"></div>' +
            '<div class="story-window">' +
            '<span class="story-arrow left" onclick="socialStory.prev();"></span><span class="story-arrow right" onclick="socialStory.next();"></span>' +
            '<div class="controls">' +
            '<div class="story-timeline"></div>' +
            '<div class="story-nav">' +
            '<div class="story-nav-left" data-long-press-delay="100"><img class="story-icon" src="" /> <span class="story-text"></span><span class="story-date"></span></div><div data-long-press-delay="100" class="story-nav-right"><a href="#" class="close story-close" onclick="socialStory.close();"></a></div>' +
            '</div>' +
            `</div>
            <div class="story">

            <a href="" class="story-link"></a>
            
            <div class="story-video" onclick="socialStory.next();">
        <video preload="auto" class="story-next" src=""  autoplay playsinline data-long-press-delay="500" style="max-width: 100vw;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);">
        
        </video>
           </div>
        <img class="sotry-image" src=""></img> ` +
            '</div>' +
            '<div class="spinner">' +
            '<div class="bounce1"></div>' +
            '<div class="bounce2"></div>' +
            '<div class="bounce3"></div>' +
            '</div>' +
            '</div>' +
            '</div>';

        var timelineHTML = '';

        // Add HTML to storytime div element
        Div.innerHTML = baseHTML;

        // Create timeline elements by looping thorugh story items
        var i;
        for (i = 0; i < defaults.playlist.length; i++) {
            //time conter
            timelineHTML = timelineHTML + '<div class="story-timeline-item"><div class="story-timeline-line"></div><div class="story-timeline-line-active story-active-' + i + '" style="width: 0%;"></div></div>';
        }
        // Add timeline HTML to storytime div element
        var storyTimeline = document.getElementsByClassName('story-timeline')[0];
        storyTimeline.innerHTML = timelineHTML;
    };

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    function GetFilename(url) {
        return url.split(/[#?]/)[0].split('.').pop().trim();

    }

    //load firt video


    //MediaLoader()


    async function CreateTemplate(src) {

        //console.log('data2')
        thisTimeline.style.width = '0%';
        if (['mp4', 'avi'].includes(GetFilename(src))) {
            //story-timeline   
            // console.log('isso é um video')
            console.log(defaults.playlist[start].action.url)

            if (defaults.playlist[start].action.url) {
                var link = document.getElementsByClassName('story-link')[0]
                link.setAttribute('href', defaults.playlist[start].action.url)
                link.innerHTML = defaults.playlist[start].action.text
                link.setAttribute("style", "opacity: 1;");

            } else document.getElementsByClassName('story-link')[0].setAttribute("style", "opacity: 0;");

            video = document.getElementsByTagName("video")[0];
            video.src = ''
            video.src = defaults.playlist[start].url
            //video.muted = (start == 0) ? true : false;

            video.addEventListener('loadedmetadata', function() {
                
                if (video.buffered.length === 0) return;
                const bufferedSeconds = video.buffered.end(0) - video.buffered.start(0);
                //console.log(`${bufferedSeconds} seconds of video are ready to play.`);
            })

            var myInterval = setInterval(function() {
                var Videopercentage = (video.buffered.end(0) / video.duration);
             
                //console.log('video carregado')

                if (Videopercentage == 1) {
                    clearInterval(myInterval);

                    if (document.getElementsByTagName("video")[1]) document.getElementsByTagName("video")[1].remove();
                    if (defaults.playlist[start + 1].url !== "undefined") {
                        console.log('Carregando prévia do próximo video')
                        PreloadVideo = document.createElement("video");
                        PreloadVideo.preload = 'auto'
                        PreloadVideo.muted = true
                        PreloadVideo.src = defaults.playlist[start + 1].url
                        document.body.appendChild(PreloadVideo);
                        PreloadVideo.play();

                    }
                }
            }, 1000);
            
            // When video can play, hide spinner
            video.oncanplay = function() {
                storySpinner.style.display = 'none';
                video.play();
                //document.getElementsByClassName('story-video')[0].setAttribute("style", "min-width: " + video.offsetWidth + "px;");
            };
            // Add event listener to track video progress and run function timeUpdate()
            video.addEventListener('timeupdate', timeUpdate, false);
            // Add event listerer to run function videoEnded() at end of video
            video.addEventListener('ended', videoEnded, false);
        } else {
            image = document.getElementsByClassName('sotry-image')[0]
            image.src = ''
            image.src = src
        }


    }


    document.addEventListener('touchstart', function(event) {
        if (active) { video.pause() }
    }, false);

    document.addEventListener('touchend', function(event) {
        if (active) { video.play() }
    }, false);


    async function launch() {

        console.log('começando poelo story', start)
        active = true
            // Get HTML elements
        storyTime = document.getElementsByClassName('storytime')[0];
        storySpinner = document.getElementsByClassName('spinner')[0];
        thisTimeline = document.getElementsByClassName('story-active-' + start)[0];
        var icon = document.getElementsByClassName('story-icon')[0];
        var text = document.getElementsByClassName('story-text')[0];
        var date = document.getElementsByClassName('story-date')[0];

        store('current', start)

        // imagens
        currentStory = document.getElementsByClassName('story')[0];
        // Show the Social Story Pop-up
        if (start == 0) {
            storyTime.setAttribute("style", "display: block; opacity: 0; z-index: 999999");
        } else {
            storyTime.setAttribute("style", "display: block; opacity: 1; z-index: -999999");
        }

        // Set CSS loading spinner to display: block (i.e. show it)
        storySpinner.style.display = 'block';
        setTimeout(function() {
            storyTime.setAttribute("style", "display: block; opacity: 1; z-index: 999999");
        }, 10);

        // Load in the icon
        icon.src = defaults.playlist[start].icon;
        text.innerHTML = defaults.playlist[start].title;
        date.innerHTML = defaults.playlist[start].date;
        await CreateTemplate(defaults.playlist[start].url).then(data => {})

        const div = document.getElementById('storytime');
        if (div.requestFullscreen)
            div.requestFullscreen();
        else if (div.webkitRequestFullscreen)
            div.webkitRequestFullscreen();
        else if (div.msRequestFullScreen)
            div.msRequestFullScreen();

        //definir se é video ou imagem
        // console.log(`${defaults.playlist[start].url} file ${GetFilename(defaults.playlist[start].url)}`)

    }


    //  video.src = defaults.playlist[0].url



    function timeUpdate() {
        // Calculate percentage of video played and update the videos timeline width accordingly
        //var percentage = Math.ceil((100 / video.duration) * video.currentTime);
        var percentage = ((100 / video.duration) * video.currentTime);
        thisTimeline.style.width = percentage + '%';

    }

    function videoEnded() {
        // Remove all event listeners on video end so they don't get duplicated.
        video.removeEventListener('timeupdate', timeUpdate);
        video.removeEventListener('ended', videoEnded);
        // Run next video
        next();
    }




    function next() {
        // Set previous video timeline to 100% complete
        thisTimeline.style.width = '100%';
        // Advance play count to next video
        start++;
        // If next video doesn't exist (i.e. the previous video was the last) then close the Social Story popup
        if (start >= defaults.playlist.length) {
            setTimeout(function() {
                close();
                return false;
            }, 400);
        } else {
            // Otherwise run the next video
            launch(start);
        }
    }

    function prev() {
        // If previous video was not first video set its timeline to 0% 
        if (start != 0) {
            thisTimeline.style.width = '0%';
        }
        // Subtract play count to previous video
        start--;
        // If next video doesn't exist (i.e. the previous video was the last) then close the Social Story popup
        if (start < 0) {
            start = 0;
            return false;
        } else {
            // Otherwise run the previous video
            launch(start);
        }
    }

    function close() {
        if (document.fullscreenElement) {
            document.exitFullscreen()
                .then(() => console.log("Document Exited from Full screen mode"))
                .catch((err) => console.error(err))
        }
        active = false
            // Pause currently playing video
        video.pause();
        // Hide Social Story popup
        storyTime.setAttribute("style", "opacity: 0;");
        // After 500ms set stoyrtime element to display:none and reset all video timelines to 0%
        setTimeout(function() {
            storyTime.setAttribute("style", "opacity: 0; display: none;");
            var i;
            for (i = 0; i < defaults.playlist.length; i++) {
                document.getElementsByClassName('story-timeline-line-active')[i].setAttribute("style", "width: 0%;");
            }
        }, 500);
    }





    // Plugin functions that can be called from your webpages


    // socialStory.launch()
    Story.prototype.launch = function(num) {
        // Launch Social Stories - if no number is passed with socialStory.launch() then choose the first story.  As the stories are a javascript array the first story is 0
        if (!num) { var num = 0; }
        start = num;
        launch();
    };

    // socialStory.next()
    Story.prototype.next = function() {
        next();
    };

    // socialStory.prev()
    Story.prototype.prev = function() {
        prev();
    };

    // socialStory.close()
    Story.prototype.close = function() {
        close();
    };

}());