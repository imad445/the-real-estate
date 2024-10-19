const SVG_Thumb = `<svg width="24px" height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="currentColor"></path></svg>`

export const FormExtension = {
  name: 'Forms',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_form' || trace.payload.name === 'ext_form',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form')
    
    formContainer.innerHTML = `
      <style>
        form {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          margin: 0 auto;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
          color: #333;
        }
        input[type="text"], input[type="email"] {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #378d1a;
          border-radius: 20px;
          box-sizing: border-box;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }
        input[type="text"]:focus, input[type="email"]:focus {
          border-color: #378d1a;
          outline: none;
        }
        .submit {
          background: linear-gradient(to right, #378d1a, #53d145);
          color: white;
          padding: 10px;
          border: none;
          border-radius: 20px;
          width: 100%;
          cursor: pointer;
          font-size: 16px;
          transition: opacity 0.3s;
        }
        .submit:hover {
          opacity: 0.9;
        }
      </style>
      
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required>
      
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
      
      <button type="submit" class="submit">Submit</button>
    `
    
    formContainer.addEventListener('submit', function (event) {
      event.preventDefault()
      
      const name = formContainer.querySelector('#name')
      const email = formContainer.querySelector('#email')
      
      if (!name.checkValidity() || !email.checkValidity()) {
        return
      }
      
      formContainer.querySelector('.submit').remove()
      
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { name: name.value, email: email.value },
      })
    })
    
    element.appendChild(formContainer)
  },
}

export const MapExtension = {
  name: 'Maps',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_map' || trace.payload.name === 'ext_map',
  render: ({ trace, element }) => {
    const GoogleMap = document.createElement('iframe')
    const { apiKey, origin, destination, zoom, height, width } = trace.payload

    GoogleMap.width = width || '240'
    GoogleMap.height = height || '240'
    GoogleMap.style.border = '0'
    GoogleMap.loading = 'lazy'
    GoogleMap.allowFullscreen = true
    GoogleMap.src = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}&zoom=${zoom}`

    element.appendChild(GoogleMap)
  },
}

export const VideoExtension = {
  name: 'Video',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_video' || trace.payload.name === 'ext_video',
  render: ({ trace, element }) => {
    const videoElement = document.createElement('video')
    const { videoURL, autoplay, controls } = trace.payload

    videoElement.width = 240
    videoElement.src = videoURL

    if (autoplay) {
      videoElement.setAttribute('autoplay', '')
    }
    if (controls) {
      videoElement.setAttribute('controls', '')
    }

    videoElement.addEventListener('ended', function () {
      window.voiceflow.chat.interact({ type: 'complete' })
    })
    element.appendChild(videoElement)
  },
}

export const TimerExtension = {
  name: 'Timer',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_timer' || trace.payload.name === 'ext_timer',
  render: ({ trace, element }) => {
    const { duration } = trace.payload || 5
    let timeLeft = duration

    const timerContainer = document.createElement('div')
    timerContainer.innerHTML = `<p>Time left: <span id="time">${timeLeft}</span></p>`

    const countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown)
        window.voiceflow.chat.interact({ type: 'complete' })
      } else {
        timeLeft -= 1
        timerContainer.querySelector('#time').textContent = timeLeft
      }
    }, 1000)

    element.appendChild(timerContainer)
  },
}

export const FileUploadExtension = {
  name: 'FileUpload',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_fileUpload' || trace.payload.name === 'ext_fileUpload',
  render: ({ trace, element }) => {
    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 204, 113, 0.6); /* Green border */
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.3s ease;
          font-family: Arial, sans-serif;
          color: #2ecc71;
        }
        .my-file-upload:hover {
          border-color: rgba(46, 204, 113, 1); /* Darker green on hover */
        }
        .uploading {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' style='display: none;'>
    `;

    const fileInput = fileUploadContainer.querySelector('input[type=file]');
    const fileUploadBox = fileUploadContainer.querySelector('.my-file-upload');

    fileUploadBox.addEventListener('click', function () {
      fileInput.click();
    });

    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0];
      console.log('File selected:', file);

      fileUploadContainer.innerHTML = `<div class="uploading">
        <img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Uploading" width="50" height="50">
        <span style="margin-left: 10px; color: #2ecc71;">Uploading...</span>
      </div>`;

      var data = new FormData();
      data.append('file', file);

      fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Upload failed: ' + response.statusText);
          }
        })
        .then((result) => {
          fileUploadContainer.innerHTML =
            '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">';
          console.log('File uploaded:', result.data.url);
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: {
              file: result.data.url.replace(
                'https://tmpfiles.org/',
                'https://tmpfiles.org/dl/'
              ),
            },
          });
        })
        .catch((error) => {
          console.error(error);
          fileUploadContainer.innerHTML = '<div style="color: red;">Error during upload</div>';
        });
    });

    element.appendChild(fileUploadContainer);
  },
}

export const KBUploadExtension = {
  name: 'KBUpload',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_KBUpload' || trace.payload.name === 'ext_KBUpload',
  render: ({ trace, element }) => {
    const apiKey = trace.payload.apiKey || null
    const maxChunkSize = trace.payload.maxChunkSize || 1000
    const tags = `tags=${JSON.stringify(trace.payload.tags)}&` || ''
    const overwrite = trace.payload.overwrite || false

    if (apiKey) {
      const kbfileUploadContainer = document.createElement('div')
      kbfileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' accept='.txt,.text,.pdf,.docx' style='display: none;'>
    `

      const fileInput = kbfileUploadContainer.querySelector('input[type=file]')
      const fileUploadBox =
        kbfileUploadContainer.querySelector('.my-file-upload')

      fileUploadBox.addEventListener('click', function () {
        fileInput.click()
      })

      fileInput.addEventListener('change', function () {
        const file = fileInput.files[0]

        kbfileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`

        const formData = new FormData()
        formData.append('file', file)

        fetch(
          `https://api.voiceflow.com/v3alpha/knowledge-base/docs/upload?${tags}overwrite=${overwrite}&maxChunkSize=${maxChunkSize}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: apiKey,
            },
            body: formData,
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error('Upload failed: ' + response.statusText)
              window.voiceflow.chat.interact({
                type: 'error',
                payload: {
                  id: 0,
                },
              })
            }
          })
          .then((result) => {
            kbfileUploadContainer.innerHTML =
              '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">'
            window.voiceflow.chat.interact({
              type: 'complete',
              payload: {
                id: result.data.documentID || 0,
              },
            })
          })
          .catch((error) => {
            console.error(error)
            kbfileUploadContainer.innerHTML = '<div>Error during upload</div>'
          })
      })
      element.appendChild(kbfileUploadContainer)
    }
  },
}

export const DateExtension = {
  name: 'Date',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_date' || trace.payload.name === 'ext_date',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form')

    // Get current date and time
    let currentDate = new Date()
    let minDate = new Date()
    minDate.setMonth(currentDate.getMonth() - 1)
    let maxDate = new Date()
    maxDate.setMonth(currentDate.getMonth() + 2)

    // Convert to ISO string and remove seconds and milliseconds
    let minDateString = minDate.toISOString().slice(0, 16)
    let maxDateString = maxDate.toISOString().slice(0, 16)

    formContainer.innerHTML = `
          <style>
            label {
              font-size: 0.8em;
              color: #888;
            }
            input[type="datetime-local"]::-webkit-calendar-picker-indicator {
                border: none;
                background: transparent;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
                bottom: 0;
                outline: none;
                color: transparent;
                cursor: pointer;
                height: auto;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                width: auto;
                padding:6px;
                font: normal 8px sans-serif;
            }
            .meeting input{
              background: transparent;
              border: none;
              padding: 2px;
              border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
              font: normal 14px sans-serif;
              outline:none;
              margin: 5px 0;
              &:focus{outline:none;}
            }
            .invalid {
              border-color: red;
            }
            .submit {
              background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
              border: none;
              color: white;
              padding: 10px;
              border-radius: 5px;
              width: 100%;
              cursor: pointer;
              opacity: 0.3;
            }
            .submit:enabled {
              opacity: 1; /* Make the button fully opaque when it's enabled */
            }
          </style>
          <label for="date">Select your date/time</label><br>
          <div class="meeting"><input type="datetime-local" id="meeting" name="meeting" value="" min="${minDateString}" max="${maxDateString}" /></div><br>
          <input type="submit" id="submit" class="submit" value="Submit" disabled="disabled">
          `

    const submitButton = formContainer.querySelector('#submit')
    const datetimeInput = formContainer.querySelector('#meeting')

    datetimeInput.addEventListener('input', function () {
      if (this.value) {
        submitButton.disabled = false
      } else {
        submitButton.disabled = true
      }
    })
    formContainer.addEventListener('submit', function (event) {
      event.preventDefault()

      const datetime = datetimeInput.value
      console.log(datetime)
      let [date, time] = datetime.split('T')

      formContainer.querySelector('.submit').remove()

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { date: date, time: time },
      })
    })
    element.appendChild(formContainer)
  },
}

export const ConfettiExtension = {
  name: 'Confetti',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'ext_confetti' || trace.payload.name === 'ext_confetti',
  effect: ({ trace }) => {
    const canvas = document.querySelector('#confetti-canvas')

    var myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })
    myConfetti({
      particleCount: 200,
      spread: 160,
    })
  },
}

export const FeedbackExtension = {
  name: 'Feedback',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_feedback' || trace.payload.name === 'ext_feedback',
  render: ({ trace, element }) => {
    const feedbackContainer = document.createElement('div');

    feedbackContainer.innerHTML = `
      <style>
        .feedback-container {
          background-color: #ffffff;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          box-sizing: border-box;
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .feedback-title {
          font-size: 16px; /* Increased font size */
          font-weight: bold; /* Match submit button font weight */
          margin-bottom: 12px;
          color: #333;
          text-align: center; /* Center align text */
        }
        .star-rating {
          font-size: 24px; /* Increased star size */
          color: #e0e0e0;
          margin-bottom: 12px;
          justify-content: center; /* Center align stars */
          display: flex;
        }
        .star-rating .star {
          display: inline-block;
          margin: 0 8px; /* Add spacing between stars */
        }
        .star-rating .star.active {
          color: #ffd700;
        }
        textarea {
          width: 100%;
          padding: 8px;
          margin: 8px 0;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
          resize: none; /* Remove scrollbar */
          height: 60px; /* Set fixed height */
          font-family: inherit; /* Inherit font from container */
        }
        .submit-btn {
          background-color: #6B4EFF;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold; /* Match title font weight */
          width: 100%;
          margin-top: 8px;
        }
      </style>
      <div class="feedback-container">
        <div class="feedback-title">Please give your feedback on our customer service:</div>
        <div class="star-rating" id="starRating">
          <span class="star" data-value="1">★</span>
          <span class="star" data-value="2">★</span>
          <span class="star" data-value="3">★</span>
          <span class="star" data-value="4">★</span>
          <span class="star" data-value="5">★</span>
        </div>
        <textarea id="feedbackText" placeholder="Share your experience with us..."></textarea>
        <button class="submit-btn" id="submitFeedback">Submit Feedback</button>
      </div>
    `;

    let selectedRating = 0;

    const starRating = feedbackContainer.querySelector('#starRating');
    const stars = starRating.querySelectorAll('.star');
    const feedbackText = feedbackContainer.querySelector('#feedbackText');
    const submitButton = feedbackContainer.querySelector('#submitFeedback');

    function updateStars(rating) {
      stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
      });
    }

    starRating.addEventListener('click', (event) => {
      if (event.target.classList.contains('star')) {
        selectedRating = parseInt(event.target.dataset.value);
        updateStars(selectedRating);
      }
    });

    starRating.addEventListener('mouseover', (event) => {
      if (event.target.classList.contains('star')) {
        updateStars(parseInt(event.target.dataset.value));
      }
    });

    starRating.addEventListener('mouseout', () => {
      updateStars(selectedRating);
    });

    submitButton.addEventListener('click', () => {
      if (selectedRating === 0) {
        alert('Please select a rating before submitting.');
        return;
      }

      const feedback = {
        rating: selectedRating,
        comment: feedbackText.value.trim(),
      };

      console.log('Feedback submitted:', feedback);

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: feedback,
      });

      feedbackContainer.innerHTML = '<p>Thank you for your feedback!</p>';
    });

    element.appendChild(feedbackContainer);
  },
}

export const MultiOptionsExtension = {
  name: 'MultiOptions',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_multioptions' || trace.payload.name === 'ext_multioptions',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
      <style>
        .multi-options-container {
          font-family: 'Arial', sans-serif;
          max-width: 400px;
          margin: 10px auto;
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 10px;
        }
        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .option {
          background-color: #ffffff;
          border: 1px solid #378d1a;
          border-radius: 20px;
          padding: 6px 4px;
          text-align: center;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .option:hover {
          background-color: #e6ffe6;
        }
        .option.selected {
          background-color: #378d1a;
          color: white;
        }
      </style>
      <div class="multi-options-container">
        <div class="options-grid">
          <div class="option" data-value="Brain Fog">Brain Fog</div>
          <div class="option" data-value="Bloating">Bloating</div>
          <div class="option" data-value="Mood">Mood</div>
          <div class="option" data-value="Immunity">Immunity</div>
          <div class="option" data-value="Sleep">Sleep</div>
          <div class="option" data-value="Skin">Skin</div>
          <div class="option" data-value="Hair">Hair</div>
          <div class="option" data-value="Metabolism">Metabolism</div>
          <div class="option" data-value="Energy">Energy</div>
          <div class="option" data-value="Libido">Libido</div>
          <div class="option" data-value="Hydration">Hydration</div>
          <div class="option" data-value="Mineralization">Mineralization</div>
        </div>
      </div>
    `;
    
    formContainer.querySelectorAll('.option').forEach(option => {
      option.addEventListener('click', () => {
        option.classList.add('selected');
        setTimeout(() => {
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: { selectedOption: option.getAttribute('data-value') },
          });
          element.innerHTML = '';
        }, 300);
      });
    });
    
    element.appendChild(formContainer);
  },
}

export const LocationExtension = {
  name: 'LocationCapture',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_location' || trace.payload.name === 'ext_location',
  render: ({ trace, element }) => {
    const locationContainer = document.createElement('div');

    locationContainer.innerHTML = `
      <style>
        .location-wrapper {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          margin: 0 auto;
          text-align: center;
        }
        .get-location-btn {
          background: #190AD5;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 20px;
          width: 100%;
          cursor: pointer;
          font-size: 16px;
          transition: opacity 0.3s;
        }
        .get-location-btn:hover {
          opacity: 0.9;
        }
        .loading {
          margin-top: 10px;
          font-size: 14px;
          color: #190AD5;
        }
      </style>

      <div class="location-wrapper">
        <p>Click the button to share your location:</p>
        <button class="get-location-btn">Share Location</button>
        <div class="loading" style="display: none;">Retrieving location...</div>
      </div>
    `;

    const button = locationContainer.querySelector('.get-location-btn');
    const loadingMessage = locationContainer.querySelector('.loading');

    button.addEventListener('click', function () {
      loadingMessage.style.display = 'block';
      button.style.display = 'none';

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Send the location data to the webhook
            fetch('https://hook.eu2.make.com/3jemfsmhmbpznm3ma8sf1ssr5ym0ynfe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                lat: latitude,
                lon: longitude,
              }),
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              console.log('Success:', data);
              // Remove the entire extension after successful location capture
              element.removeChild(locationContainer);
            })
            .catch((error) => {
              console.error('Error:', error);
              loadingMessage.style.display = 'none';
              button.style.display = 'block';
            });
          },
          function (error) {
            alert('Unable to retrieve location. Please check your browser settings.');
            loadingMessage.style.display = 'none';
            button.style.display = 'block';
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
        loadingMessage.style.display = 'none';
        button.style.display = 'block';
      }
    });

    element.appendChild(locationContainer);
  },
}

export const RoomSelectorExtension = {
  name: 'RoomSelector',
  type: 'response',
  match: ({ trace }) => trace.type === 'ext_room_selector' || trace.payload?.name === 'ext_room_selector',
  render: ({ element }) => {
    const container = document.createElement('div');
    
    container.innerHTML = `
      <style>
        .room-selector-container {
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          margin: 0 auto;
          font-family: 'Arial', sans-serif;
        }
        .room-selector-label {
          display: block;
          margin-bottom: 15px;
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
        .room-selector-range {
          width: 100%;
          -webkit-appearance: none;
          background: transparent;
          margin-bottom: 20px;
        }
        .room-selector-range::-webkit-slider-runnable-track {
          width: 100%;
          height: 6px;
          background: #e0e0e0;
          border-radius: 3px;
        }
        .room-selector-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #4CAF50;
          cursor: pointer;
          margin-top: -7px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .room-selector-value {
          text-align: center;
          font-size: 28px;
          color: #4CAF50;
          margin: 15px 0;
          font-weight: bold;
        }
        .room-selector-submit {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 18px;
          cursor: pointer;
          display: block;
          margin: 20px auto 0;
          transition: background-color 0.3s, transform 0.1s;
        }
        .room-selector-submit:hover {
          background-color: #45a049;
        }
        .room-selector-submit:active {
          transform: scale(0.98);
        }
        .rooms-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }
        .room {
          width: 40px;
          height: 40px;
          background-color: #4CAF50;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      </style>
      <div class="room-selector-container">
        <label class="room-selector-label" for="roomRange">Select number of rooms:</label>
        <input type="range" id="roomRange" class="room-selector-range" min="1" max="10" value="3">
        <div class="room-selector-value" id="roomValue">3 ROOMS</div>
        <div class="rooms-container" id="roomsContainer"></div>
        <button class="room-selector-submit" id="submitRooms">Confirm</button>
      </div>
    `;
    
    const rangeInput = container.querySelector('#roomRange');
    const valueDisplay = container.querySelector('#roomValue');
    const submitButton = container.querySelector('#submitRooms');
    const roomsContainer = container.querySelector('#roomsContainer');
    
    function updateRooms(rooms) {
      roomsContainer.innerHTML = '';
      for (let i = 0; i < rooms; i++) {
        const room = document.createElement('div');
        room.className = 'room';
        room.style.animation = `fadeIn 0.3s ease forwards ${i * 0.05}s`;
        roomsContainer.appendChild(room);
      }
    }
    
    function handleRangeInput() {
      const rooms = parseInt(this.value, 10);
      valueDisplay.textContent = `${rooms} ROOM${rooms !== 1 ? 'S' : ''}`;
      updateRooms(rooms);
    }
    
    function handleSubmit() {
      const selectedRooms = parseInt(rangeInput.value, 10);
      if (typeof window.voiceflow !== 'undefined' && 
          typeof window.voiceflow.chat !== 'undefined' && 
          typeof window.voiceflow.chat.interact === 'function') {
        window.voiceflow.chat.interact({
          type: 'complete',
          payload: { selectedRooms: selectedRooms },
        });
      } else {
        console.error('Voiceflow chat interaction not available');
      }
    }
    
    rangeInput.addEventListener('input', handleRangeInput);
    submitButton.addEventListener('click', handleSubmit);
    
    element.appendChild(container);
    
    // Initial rooms update
    updateRooms(3);
  },
}