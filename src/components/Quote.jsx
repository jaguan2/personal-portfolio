import { useMemo } from 'react'
import './Quote.css'

const quotes = [
  {
    text: 'Everything will be okay in the end.\nIf it\'s not okay,\nit\'s not the end.',
    author: null
  },
  {
    text: 'There\'s something beautiful about the people who turn their pain into kindness, instead of bitterness.',
    author: null
  },
  {
    text: 'Only when it is dark enough can you see the stars.',
    author: 'Kamala Harris'
  },
  {
    text: 'To be young is to burn bright. Don\'t live your life with regrets.',
    author: 'The On1y One, 2024'
  },
  {
    text: 'Even when you\'re suffering so much that you lose your mind, just as the flower blooms even in the harsh rain, let\'s press on.',
    author: null
  },
  {
    text: 'You and your dream were both beautiful. When you know more than anyone that your dream won\'t be rewarded… yet you still challenged it.',
    author: 'Achilles'
  },
  {
    text: 'Goodbyes are always going to come. You can\'t get through life if they make you sad all the time. So you send them off with as much appreciation as you can. And rejoice the fact that you met, and that you lived to say goodbye.',
    author: 'Ishtar'
  },
  {
    text: 'No matter what you\'re feeling, I hope you know you\'re allowed to feel that way. You don\'t have to force yourself to get over something right away — you\'re allowed to sit in your pain, your frustration, your exhaustion, whatever it may be, because you\'re only human.',
    author: 'Joshua Hong'
  },
  {
    text: 'The most important thing is you. You should recognize yourself. If you don\'t recognize yourself, how can others recognize you?',
    author: 'Zhengting'
  },
  {
    text: 'The world does not change first. The self does.',
    author: 'Love begins in the world of if, 2026'
  },
  {
    text: 'I realize that I have to believe in myself through the bumps against reality as I experience emotions of rejection, confusion, recognition, and dignity. I trust just believing in yourself can make you stand out.',
    author: null
  }
]

function Quote() {
  const todaysQuote = useMemo(() => {
    if (quotes.length === 0) return null
    const dayOfMonth = new Date().getDate()
    return quotes[(dayOfMonth - 1) % quotes.length]
  }, [])

  if (!todaysQuote) return null

  return (
    <section id="quote" aria-label="Today's pour">
      <div className="quote-label-row">
        <span className="quote-divider" aria-hidden="true" />
        <span className="quote-label">today's pour</span>
        <span className="quote-divider" aria-hidden="true" />
      </div>
      <blockquote className="quote-text reveal">
        <p>&ldquo;{todaysQuote.text}&rdquo;</p>
        {todaysQuote.author && (
          <cite className="quote-author">— {todaysQuote.author}</cite>
        )}
      </blockquote>
      <p className="closing-message">Thank you for taking a part of your day to scroll.</p>
    </section>
  )
}

export default Quote
