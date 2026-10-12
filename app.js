document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       HEADER
    ========================== */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    const searchButton = document.getElementById("searchButton");
    const searchPanel = document.getElementById("searchPanel");
    const searchInput = document.getElementById("searchInput");
    const closeSearch = document.getElementById("closeSearch");
    const searchResults = document.getElementById("searchResults");

    const loginButton = document.getElementById("loginButton");
    const mobileSignIn = document.getElementById("mobileSignIn");

    const startListening = document.getElementById("startListening");
    const exploreMusic = document.getElementById("exploreMusic");


    /* =========================
       MOBILE MENU
    ========================== */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", function (event) {

            event.stopPropagation();

            mobileMenu.classList.toggle("active");

        });

    }

    document.addEventListener("click", function (event) {

        if (
            mobileMenu &&
            menuButton &&
            !mobileMenu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            mobileMenu.classList.remove("active");

        }

    });


    if (mobileMenu) {

        mobileMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove("active");

            });

        });

    }


    /* =========================
       SEARCH
    ========================== */

    if (searchButton && searchPanel) {

        searchButton.addEventListener("click", function () {

            searchPanel.classList.add("active");

            if (searchInput) {
                searchInput.focus();
            }

        });

    }


    if (closeSearch && searchPanel) {

        closeSearch.addEventListener("click", function () {

            searchPanel.classList.remove("active");

        });

    }


    function performSearch() {

        if (!searchInput || !searchResults) {
            return;
        }

        const query =
            searchInput.value.trim().toLowerCase();

        if (!query) {

            searchResults.innerHTML =
                "<p>Type something to search T-KEL DECK.</p>";

            return;

        }

        const items =
            document.querySelectorAll(
                "section, .music-card, .release-item, .artist-card"
            );

        let found = false;

        items.forEach(function (item) {

            if (
                item.textContent
                    .toLowerCase()
                    .includes(query)
            ) {

                found = true;

            }

        });

        searchResults.innerHTML =
            found
                ? "<p>Result found on T-KEL DECK.</p>"
                : "<p>Result not found.</p>";

    }


    if (searchInput) {

        searchInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        });

    }


    /* =========================
       SIGN IN
    ========================== */

    function openLogin() {

        alert(
            "T-KEL DECK sign-in will be connected to the account system soon."
        );

    }


    if (loginButton) {

        loginButton.addEventListener("click", openLogin);

    }


    if (mobileSignIn) {

        mobileSignIn.addEventListener("click", function () {

            if (mobileMenu) {
                mobileMenu.classList.remove("active");
            }

            openLogin();

        });

    }


    /* =========================
       HERO
    ========================== */

    function goToDiscover() {

        const discover =
            document.getElementById("discover");

        if (discover) {

            discover.scrollIntoView({
                behavior: "smooth"
            });

        }

    }


    if (startListening) {

        startListening.addEventListener(
            "click",
            goToDiscover
        );

    }


    if (exploreMusic) {

        exploreMusic.addEventListener(
            "click",
            goToDiscover
        );

    }


    /* =========================
       AUDIO
    ========================== */

    const audio = new Audio();


    /* =========================
       MINI PLAYER
    ========================== */

    const miniPlayer =
        document.getElementById("miniPlayer");

    const playButton =
        document.getElementById("playButton");

    const previousButton =
        document.getElementById("previousButton");

    const nextButton =
        document.getElementById("nextButton");

    const playerTitle =
        document.getElementById("playerTitle");

    const playerArtist =
        document.getElementById("playerArtist");


    /* =========================
       EXPANDED PLAYER
    ========================== */

    const expandedPlayer =
        document.getElementById("expandedPlayer");

    const closeExpandedPlayer =
        document.getElementById("closeExpandedPlayer");

    const expandedPlayerTitle =
        document.getElementById("expandedPlayerTitle");

    const expandedPlayerArtist =
        document.getElementById("expandedPlayerArtist");

    const expandedPlayButton =
        document.getElementById("expandedPlayButton");

    const expandedPreviousButton =
        document.getElementById("expandedPreviousButton");

    const expandedNextButton =
        document.getElementById("expandedNextButton");

    const expandedProgressBar =
        document.getElementById("expandedProgressBar");

    const expandedProgress =
        document.getElementById("expandedProgress");

    const currentTimeElement =
        document.getElementById("currentTime");

    const totalTimeElement =
        document.getElementById("totalTime");

    const expandedVolumeSlider =
        document.getElementById("expandedVolumeSlider");

    const expandedVolumeValue =
        document.getElementById("expandedVolumeValue");

    const expandedVolumeIcon =
        document.getElementById("expandedVolumeIcon");

    const shuffleButton =
        document.getElementById("shuffleButton");

    const repeatButton =
        document.getElementById("repeatButton");

    const likeButton =
        document.getElementById("likeButton");

    const expandedQueueButton =
        document.getElementById("expandedQueueButton");

    const queueButton =
        document.getElementById("queueButton");

    const moreButton =
        document.getElementById("moreButton");


    /* =========================
       VOLUME
    ========================== */

    const volumeButton =
        document.getElementById("volumeButton");

    const volumePanel =
        document.getElementById("volumePanel");

    const volumeSlider =
        document.getElementById("volumeSlider");

    const volumeValue =
        document.getElementById("volumeValue");

    const volumeIcon =
        document.getElementById("volumeIcon");

    const muteButton =
        document.getElementById("muteButton");


    /* =========================
       SONGS
    ========================== */

    const songs = [

        {
            title: "T-KEL Test Song",
            artist: "T-KEL",
            file: "music/T-KEL Test song.wav"
        }

    ];


    let currentSong = 0;

    let currentVolume = 0.8;
    let previousVolume = 0.8;
    let isMuted = false;

    let shuffleMode = false;

    /*
       Repeat modes:

       0 = Off
       1 = Repeat All
       2 = Repeat One
    */

    let repeatMode = 0;

    let pressTimer = null;
    let seekTimer = null;

    let isHoldingPrevious = false;
    let isHoldingNext = false;

    let seekAmount = 5;


    /* =========================
       TIME FORMAT
    ========================== */

    function formatTime(seconds) {

        if (
            !Number.isFinite(seconds) ||
            seconds < 0
        ) {

            return "0:00";

        }

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return (
            minutes +
            ":" +
            String(remainingSeconds).padStart(2, "0")
        );

    }


    /* =========================
       LOAD SONG
    ========================== */

    function loadSong(index) {

        if (!songs[index]) {
            return;
        }

        const song = songs[index];

        audio.src = song.file;

        audio.volume = currentVolume;

        if (playerTitle) {
            playerTitle.textContent = song.title;
        }

        if (playerArtist) {
            playerArtist.textContent = song.artist;
        }

        if (expandedPlayerTitle) {
            expandedPlayerTitle.textContent = song.title;
        }

        if (expandedPlayerArtist) {
            expandedPlayerArtist.textContent = song.artist;
        }

        if (expandedProgress) {
            expandedProgress.style.width = "0%";
        }

        if (currentTimeElement) {
            currentTimeElement.textContent = "0:00";
        }

        if (totalTimeElement) {
            totalTimeElement.textContent = "0:00";
        }

        audio.load();

    }


    /* =========================
       PLAY / PAUSE
    ========================== */

    function playSong() {

    audio.play()
        .then(function () {

            if (playButton) {
                playButton.textContent = "❚❚";
            }

            if (expandedPlayButton) {
                expandedPlayButton.classList.add("is-playing");
            }

        })
        .catch(function (error) {

            console.log(
                "Audio playback error:",
                error
            );

        });

}


    function pauseSong() {

    audio.pause();

    if (playButton) {
        playButton.textContent = "▶";
    }

    if (expandedPlayButton) {
        expandedPlayButton.classList.remove("is-playing");
    }

}


    function togglePlay() {

        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }

    }


    if (playButton) {

        playButton.addEventListener("click", function (event) {

            event.stopPropagation();

            togglePlay();

        });

    }


    if (expandedPlayButton) {

        expandedPlayButton.addEventListener(
            "click",
            togglePlay
        );

    }


    /* =========================
       NEXT SONG
    ========================== */

    function nextSong() {

        if (songs.length <= 1) {

            audio.currentTime = Math.min(
                audio.duration || 0,
                audio.currentTime + 10
            );

            return;

        }


        if (shuffleMode) {

            let newIndex;

            do {

                newIndex =
                    Math.floor(
                        Math.random() *
                        songs.length
                    );

            } while (
                newIndex === currentSong
            );

            currentSong = newIndex;

        } else {

            currentSong++;

            if (
                currentSong >=
                songs.length
            ) {

                currentSong = 0;

            }

        }

        loadSong(currentSong);

        playSong();

    }


    /* =========================
       PREVIOUS SONG
    ========================== */

    function previousSong() {

        if (songs.length <= 1) {

            audio.currentTime = Math.max(
                0,
                audio.currentTime - 10
            );

            return;

        }


        if (audio.currentTime > 3) {

            audio.currentTime = 0;

            return;

        }


        currentSong--;

        if (currentSong < 0) {

            currentSong =
                songs.length - 1;

        }

        loadSong(currentSong);

        playSong();

    }


    /* =========================
       FAST SEEK
    ========================== */

    function startFastSeek(direction, button) {

        if (!audio.duration) {
            return;
        }

        let speedLevel = 1;

        seekAmount = 5;

        if (button) {
            button.classList.add("fast-seeking");
        }


        function seek() {

            if (
                !isHoldingPrevious &&
                !isHoldingNext
            ) {

                stopFastSeek(button);

                return;

            }


            const directionAmount =
                direction * seekAmount;

            audio.currentTime =
                Math.max(
                    0,
                    Math.min(
                        audio.duration,
                        audio.currentTime +
                        directionAmount
                    )
                );


            speedLevel++;

            if (speedLevel >= 3) {
                seekAmount = 10;
            }

            if (speedLevel >= 6) {
                seekAmount = 20;
            }


            seekTimer =
                setTimeout(seek, 180);

        }


        seekTimer =
            setTimeout(seek, 180);

    }


    function stopFastSeek(button) {

        if (seekTimer) {

            clearTimeout(seekTimer);

            seekTimer = null;

        }

        if (button) {

            button.classList.remove(
                "fast-seeking"
            );

        }

    }


    function setupLongPress(button, direction) {

        if (!button) {
            return;
        }


        button.addEventListener(
            "pointerdown",
            function (event) {

                event.preventDefault();

                if (direction === -1) {
                    isHoldingPrevious = true;
                } else {
                    isHoldingNext = true;
                }


                pressTimer =
                    setTimeout(
                        function () {

                            startFastSeek(
                                direction,
                                button
                            );

                        },
                        500
                    );

            }
        );


        button.addEventListener(
            "pointerup",
            function () {

                const wasHolding =
                    direction === -1
                        ? isHoldingPrevious
                        : isHoldingNext;


                if (direction === -1) {
                    isHoldingPrevious = false;
                } else {
                    isHoldingNext = false;
                }


                if (pressTimer) {

                    clearTimeout(pressTimer);

                    pressTimer = null;

                }


                if (wasHolding) {

                    stopFastSeek(button);

                }

            }
        );


        button.addEventListener(
            "pointercancel",
            function () {

                isHoldingPrevious = false;
                isHoldingNext = false;

                if (pressTimer) {

                    clearTimeout(pressTimer);

                    pressTimer = null;

                }

                stopFastSeek(button);

            }
        );


        button.addEventListener(
            "pointerleave",
            function () {

                if (
                    !isHoldingPrevious &&
                    !isHoldingNext
                ) {

                    return;

                }

            }
        );

    }


    /*
       A normal tap changes track.

       A hold for 0.5 seconds starts fast seeking.
    */

    function attachNavigationButton(
        button,
        normalAction,
        direction
    ) {

        if (!button) {
            return;
        }


        let longPressStarted = false;


        button.addEventListener(
            "pointerdown",
            function (event) {

                event.preventDefault();

                longPressStarted = false;

                pressTimer =
                    setTimeout(
                        function () {

                            longPressStarted = true;

                            if (direction === -1) {
                                isHoldingPrevious = true;
                            } else {
                                isHoldingNext = true;
                            }

                            startFastSeek(
                                direction,
                                button
                            );

                        },
                        500
                    );

            }
        );


        button.addEventListener(
            "pointerup",
            function () {

                if (pressTimer) {

                    clearTimeout(pressTimer);

                    pressTimer = null;

                }


                if (longPressStarted) {

                    isHoldingPrevious = false;
                    isHoldingNext = false;

                    stopFastSeek(button);

                    return;

                }


                normalAction();

            }
        );


        button.addEventListener(
            "pointercancel",
            function () {

                if (pressTimer) {

                    clearTimeout(pressTimer);

                    pressTimer = null;

                }

                isHoldingPrevious = false;
                isHoldingNext = false;

                stopFastSeek(button);

            }
        );

    }


    attachNavigationButton(
        previousButton,
        previousSong,
        -1
    );


    attachNavigationButton(
        nextButton,
        nextSong,
        1
    );


    attachNavigationButton(
        expandedPreviousButton,
        previousSong,
        -1
    );


    attachNavigationButton(
        expandedNextButton,
        nextSong,
        1
    );


    /* =========================
       MINI PLAYER EXPANSION
    ========================== */

    if (miniPlayer && expandedPlayer) {

        miniPlayer.addEventListener(
            "click",
            function () {

                expandedPlayer.classList.add(
                    "active"
                );

            }
        );

    }


    if (closeExpandedPlayer) {

        closeExpandedPlayer.addEventListener(
            "click",
            function () {

                expandedPlayer.classList.remove(
                    "active"
                );

            }
        );

    }


    const miniControls =
        document.querySelector(".player-controls");

    if (miniControls) {

        miniControls.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /* =========================
       VOLUME
    ========================== */

    function updateVolume() {

        const percentage =
            Math.round(
                currentVolume * 100
            );

        audio.volume = currentVolume;


        if (volumeSlider) {
            volumeSlider.value = percentage;
        }

        if (expandedVolumeSlider) {
            expandedVolumeSlider.value = percentage;
        }

        if (volumeValue) {
            volumeValue.textContent =
                percentage + "%";
        }

        if (expandedVolumeValue) {
            expandedVolumeValue.textContent =
                percentage + "%";
        }


        let icon = "🔊";

        if (percentage === 0) {
            icon = "🔇";
        } else if (percentage < 50) {
            icon = "🔉";
        }


        if (volumeIcon) {
            volumeIcon.textContent = icon;
        }

        if (expandedVolumeIcon) {
            expandedVolumeIcon.textContent = icon;
        }

    }


    if (volumeButton && volumePanel) {

        volumeButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                volumePanel.classList.toggle(
                    "active"
                );

            }
        );

    }


    if (volumeSlider) {

        volumeSlider.addEventListener(
            "input",
            function () {

                currentVolume =
                    Number(
                        volumeSlider.value
                    ) / 100;

                if (currentVolume > 0) {

                    previousVolume =
                        currentVolume;

                    isMuted = false;

                }

                updateVolume();

            }
        );

    }


    if (expandedVolumeSlider) {

        expandedVolumeSlider.addEventListener(
            "input",
            function () {

                currentVolume =
                    Number(
                        expandedVolumeSlider.value
                    ) / 100;

                if (currentVolume > 0) {

                    previousVolume =
                        currentVolume;

                    isMuted = false;

                }

                updateVolume();

            }
        );

    }


    if (muteButton) {

        muteButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                if (!isMuted) {

                    previousVolume =
                        currentVolume;

                    currentVolume = 0;

                    isMuted = true;

                } else {

                    currentVolume =
                        previousVolume || 0.8;

                    isMuted = false;

                }

                updateVolume();

            }
        );

    }


    /* =========================
       PROGRESS
    ========================== */

    audio.addEventListener(
        "loadedmetadata",
        function () {

            if (totalTimeElement) {

                totalTimeElement.textContent =
                    formatTime(audio.duration);

            }

        }
    );


    audio.addEventListener(
        "timeupdate",
        function () {

            if (!audio.duration) {
                return;
            }

            const percentage =
                (
                    audio.currentTime /
                    audio.duration
                ) * 100;


            if (expandedProgress) {

                expandedProgress.style.width =
                    percentage + "%";

            }


            if (currentTimeElement) {

                currentTimeElement.textContent =
                    formatTime(
                        audio.currentTime
                    );

            }

        }
    );


    if (expandedProgressBar) {

        expandedProgressBar.addEventListener(
            "click",
            function (event) {

                if (!audio.duration) {
                    return;
                }

                const rect =
                    expandedProgressBar
                        .getBoundingClientRect();

                const position =
                    event.clientX -
                    rect.left;

                const percentage =
                    position /
                    rect.width;

                audio.currentTime =
                    percentage *
                    audio.duration;

            }
        );

    }


    /* =========================
   REPEAT
========================= */

function updateRepeatButton() {

    if (!repeatButton) {
        return;
    }

    repeatButton.classList.remove(
        "active",
        "repeat-one"
    );

    if (repeatMode === 0) {

        repeatButton.title =
            "Repeat Off";

    } else if (repeatMode === 1) {

        repeatButton.classList.add(
            "active"
        );

        repeatButton.title =
            "Repeat All";

    } else {

        repeatButton.classList.add(
            "active",
            "repeat-one"
        );

        repeatButton.title =
            "Repeat One";

    }

}


if (repeatButton) {

    repeatButton.addEventListener(
        "click",
        function () {

            repeatMode++;

            if (repeatMode > 2) {
                repeatMode = 0;
            }

            updateRepeatButton();

        }
    );

}


    /* =========================
       SONG END
    ========================== */

    audio.addEventListener(
        "ended",
        function () {

            if (repeatMode === 2) {

                audio.currentTime = 0;

                playSong();

                return;

            }


            if (songs.length === 1) {

                if (repeatMode === 1) {

                    audio.currentTime = 0;

                    playSong();

                } else {

                    pauseSong();

                }

                return;

            }


            nextSong();

        }
    );


    /* =========================
   SHUFFLE
========================= */

if (shuffleButton) {

    shuffleButton.addEventListener(
        "click",
        function () {

            shuffleMode =
                !shuffleMode;

            shuffleButton.classList.toggle(
                "active",
                shuffleMode
            );

            shuffleButton.title =
                shuffleMode
                    ? "Shuffle On"
                    : "Shuffle Off";

        }
    );

}


    /* =========================
       LIKE
    ========================== */

    if (likeButton) {

        likeButton.addEventListener(
            "click",
            function () {

                if (
                    likeButton.textContent
                        .includes("♡")
                ) {

                    likeButton.textContent =
                        "♥ Liked";

                    likeButton.style.color =
                        "#0066ff";

                } else {

                    likeButton.textContent =
                        "♡ Like";

                    likeButton.style.color =
                        "";

                }

            }
        );

    }


    /* =========================
       QUEUE
    ========================== */

    function showQueueMessage() {

        alert(
            "T-KEL DECK Queue will show your upcoming songs here."
        );

    }


    if (queueButton) {

        queueButton.addEventListener(
            "click",
            showQueueMessage
        );

    }


    if (expandedQueueButton) {

        expandedQueueButton.addEventListener(
            "click",
            showQueueMessage
        );

    }


    /* =========================
       MORE
    ========================== */

    if (moreButton) {

        moreButton.addEventListener(
            "click",
            function () {

                alert(
                    "More player options will be added to T-KEL DECK."
                );

            }
        );

    }


    /* =========================
       CLOSE VOLUME PANEL
    ========================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                volumePanel &&
                volumeButton &&
                !volumePanel.contains(event.target) &&
                !volumeButton.contains(event.target)
            ) {

                volumePanel.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =========================
       INITIALIZE
    ========================== */

    audio.volume = currentVolume;

    updateVolume();

    updateRepeatButton();

    loadSong(currentSong);

});
/* =========================
   DECK NAVIGATION
========================= */

document.querySelectorAll(".desktop-nav a, .mobile-menu a").forEach(link => {

    link.addEventListener("click", function (event) {

        const target = this.getAttribute("href");

        if (!target || target === "#") {
            return;
        }

        const section = document.querySelector(target);

        if (!section) {
            return;
        }

        event.preventDefault();

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        document.querySelectorAll(".desktop-nav a").forEach(navLink => {
            navLink.classList.remove("active");
        });

        const matchingDesktopLink = document.querySelector(
            `.desktop-nav a[href="${target}"]`
        );

        if (matchingDesktopLink) {
            matchingDesktopLink.classList.add("active");
        }

        const mobileMenu = document.querySelector(".mobile-menu");

        if (mobileMenu) {
            mobileMenu.classList.remove("open");
        }

    });

});


/* =========================
   MUSIC CATEGORY FILTER
========================= */

document.querySelectorAll(".music-category").forEach(button => {

    button.addEventListener("click", function () {

        document.querySelectorAll(".music-category").forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const category = this.dataset.category;

        const trendingMusic = document.getElementById("trendingMusic");

        if (!trendingMusic) {
            return;
        }

        /*
         * Until real Supabase music data is connected,
         * keep the professional empty-state visible.
         */

        if (category === "all") {
            trendingMusic.style.display = "";
        } else {
            trendingMusic.style.display = "";
        }

    });

});