var feedbackButton = document.getElementById('feedback-button')

while (!feedbackButton) {
    feedbackButton = document.getElementById('feedback-button')
}
console.log(feedbackButton)
const webhookUrl = 'https://discord.com/api/webhooks/1134137918483599411/r_Sq-PsDWvEsRmrB0YjXNPx6bpHNjDCdcZoVr45UBu4do0V7j-6XvhsdH7pi8Ng_LPmD';

var modal = document.createElement('dialog')
modal.className = 'feedbackModal'

var xButton = document.createElement('span')
xButton.innerText = 'x'
xButton.className = 'xButtonModal'

var title = document.createElement('h1')
title.innerText = 'Tool Ideas'

var label1 = document.createElement('label')

var span1 = document.createElement('span')
span1.innerText = 'Idea  '

var box1 = document.createElement('input')
box1.type = 'text'

var submit = document.createElement('div')
submit.className = "feedbackSubmitButton"
submit.innerHTML = "Submit"

var br = document.createElement('br')

var feedbackText = document.createElement('span')
feedbackText.id = "feedbackText"

document.body.appendChild(modal)
modal.appendChild(xButton)
modal.appendChild(title)
modal.appendChild(label1)
label1.appendChild(span1)
label1.appendChild(box1)
modal.appendChild(br)
modal.appendChild(feedbackText)
modal.appendChild(submit)

// this code is so messy wtf

feedbackButton.addEventListener('click', function() {
    modal.showModal();
})

xButton.addEventListener('click', function() {
    modal.close()
})

submit.addEventListener('click', function() {
    var input1Text = box1.value;
    console.log(input1Text)
    if (!input1Text) {
        feedbackText.innerText = "Please fill in the box"
    } else {
        sendMessageToDiscord(input1Text)
    }
})

// Function to send the message to the Discord webhook
function sendMessageToDiscord(message) {
  const data = {
    embeds: [
        {
            title: "Feedback has been recieved!",
            fields: [
                {
                    name: "Idea:",
                    value: message
                }
            ]
        }
    ]
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        feedbackText.innerText = "Thank you for your feedback"
       modal.close()
      } else {
        console.error('Failed to send message to Discord:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error sending message to Discord:', error);
    });
}
