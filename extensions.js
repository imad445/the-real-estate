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
    const feedbackContainer = document.createElement('div')

    feedbackContainer.innerHTML = `
          <style>
            .vfrc-feedback {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .vfrc-feedback--description {
                font-size: 0.8em;
                color: grey;
                pointer-events: none;
            }

            .vfrc-feedback--buttons {
                display: flex;
            }

            .vfrc-feedback--button {
                margin: 0;
                padding: 0;
                margin-left: 0px;
                border: none;
                background: none;
                opacity: 0.2;
            }

            .vfrc-feedback--button:hover {
              opacity: 0.5; /* opacity on hover */
            }

            .vfrc-feedback--button.selected {
              opacity: 0.6;
            }

            .vfrc-feedback--button.disabled {
                pointer-events: none;
            }

            .vfrc-feedback--button:first-child svg {
                fill: none; /* color for thumb up */
                stroke: none;
                border: none;
                margin-left: 6px;
            }

            .vfrc-feedback--button:last-child svg {
                margin-left: 4px;
                fill: none; /* color for thumb down */
                stroke: none;
                border: none;
                transform: rotate(180deg);
            }
          </style>
          <div class="vfrc-feedback">
            <div class="vfrc-feedback--description">Was this helpful?</div>
            <div class="vfrc-feedback--buttons">
              <button class="vfrc-feedback--button" data-feedback="1">${SVG_Thumb}</button>
              <button class="vfrc-feedback--button" data-feedback="0">${SVG_Thumb}</button>
            </div>
          </div>
        `

    feedbackContainer
      .querySelectorAll('.vfrc-feedback--button')
      .forEach((button) => {
        button.addEventListener('click', function (event) {
          const feedback = this.getAttribute('data-feedback')
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: { feedback: feedback },
          })

          feedbackContainer
            .querySelectorAll('.vfrc-feedback--button')
            .forEach((btn) => {
              btn.classList.add('disabled')
              if (btn === this) {
                btn.classList.add('selected')
              }
            })
        })
      })

    element.appendChild(feedbackContainer)
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

export const MultiOptionsmood = {
  name: 'MultiOptionsmood',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_multioptionsmood' || trace.payload.name === 'ext_multioptionsmood',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
        
        .multi-options-container {
          font-family: 'Roboto', sans-serif;
          max-width: 400px;
          margin: 10px auto;
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 10px;
        }
        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .option {
          background-color: #ffffff;
          border: 1px solid #378d1a;
          border-radius: 20px;
          padding: 12px;
          text-align: center;
          font-size: 14px;
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
        .submit-btn {
          display: block;
          width: 100%;
          padding: 12px;
          background-color: #378d1a;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          text-align: center;
          margin-top: 15px;
        }
        .submit-btn:disabled {
          background-color: #cccccc;
        }
      </style>
      <div class="multi-options-container">
        <div class="options-grid">
          <div class="option" data-value="Stress-related">Stress-related</div>
          <div class="option" data-value="Less reactive">Less reactive</div>
          <div class="option" data-value="Pick me up">Pick me up</div>
          <div class="option" data-value="Reduce PMS">Reduce PMS</div>
        </div>
        <button class="submit-btn" disabled>Submit</button>
      </div>
    `;
    
    const selectedOptions = new Set();
    const submitBtn = formContainer.querySelector('.submit-btn');
    
    formContainer.querySelectorAll('.option').forEach(option => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        
        if (selectedOptions.has(value)) {
          selectedOptions.delete(value);
          option.classList.remove('selected');
        } else if (selectedOptions.size < 2) {
          selectedOptions.add(value);
          option.classList.add('selected');
        }
        
        submitBtn.disabled = selectedOptions.size === 0;
      });
    });
    
    submitBtn.addEventListener('click', () => {
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { selectedOptions: Array.from(selectedOptions) },
      });
      element.innerHTML = '';
    });
    
    element.appendChild(formContainer);
  },
}