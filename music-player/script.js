const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Music
const songs = [
  {
    name: 'jacinto-1',
    title: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    title: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    title: 'Goodnight Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    title: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
]

// Check if Playing
let isPlaying = false

// Play
function playSong() {
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'Pause')
  music.play()
}

// Pause
function pauseSong() {
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'Play')
  music.pause()
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong()
})

// Update DOM
function loadSong(song) {
  title.textContent = song.title
  artist.textContent = song.artist
  music.src = `music/${song.name}.mp3`
  image.src = `img/${song.name}.jpg`
}

let songIndex = 0
// On Load - Select First Song
loadSong(songs[3])

// Previous Song
function prevSong() {
  songIndex = songIndex - 1
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}

// Next Song
function nextSong() {
  songIndex = songIndex + 1
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

// Update Progress Bar & Timeline
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60)
    let durationSeconds = Math.floor(duration % 60)
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`
    }

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`
    }
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60)
    let currentSeconds = Math.floor(currentTime % 60)
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`
    }
    if (currentSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
  }
}

// Set Progress Bar Progress
function setProgressBar(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const { duration } = music
  music.currentTime = (clickX / width) * duration
}

// Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
