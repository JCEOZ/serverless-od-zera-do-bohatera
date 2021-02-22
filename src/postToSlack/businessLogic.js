const businessLogic = async (httpAdapter, url, job) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8'
  }
  const body = prepareSlackMessage(job)
  return httpAdapter.post(url, body, { headers })
}

const prepareSlackMessage = (job) => {
  const today = parseDate(new Date())
  const message = {
    blocks: [
      {
        type: 'context',
        elements: [
          {
            text: `*${today}*`,
            type: 'mrkdwn'
          }
        ]
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:loud_sound: *${job.title}* :loud_sound:\n kasa: *${job.money}* ${job.moneyType}`
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: job.description
        },
        accessory: {
          type: 'image',
          image_url: job.image,
          alt_text: 'image'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: job.url
        }
      },
      {
        type: 'divider'
      }
    ]
  }
  return message
}

const parseDate = (date) => {
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  };
  return date.toLocaleDateString('pl-PL', options)
}

module.exports = businessLogic
