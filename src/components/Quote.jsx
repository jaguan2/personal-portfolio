import { useMemo } from 'react'
import './Quote.css'

const quotes = [
  {
    text: 'Everything will be okay in the end.\nIf it\'s not okay,\nit\'s not the end.',
    author: 'Zhan Xuan 展轩'
  },
  {
    text: 'There\'s something beautiful about the people who turn their pain into kindness, instead of bitterness.',
    author: null
  },
  {
    text: 'Only when it is dark enough can you see the stars. Let us fill the sky with the light of a billion brilliant stars.',
    author: null
  },
  {
    text: 'To be young is to burn bright. Don\'t live your life with regrets.',
    author: 'The On1y One, 2024'
  },
  {
    text: 'Even when you\'re suffering so much that you lose your mind, just as the flower blooms even in the harsh rain, let\'s press on.',
    author: 'Hwasa'
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
    text: 'No matter what you\'re feeling, I hope you know you\'re allowed to feel that way. You don\'t have to force yourself to get over something right away, you\'re allowed to sit in your pain, your frustration, your exhaustion, whatever it may be, because you\'re only human.',
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
  },
  {
    text: 'Doubt is the foundation by which you break through blind faith.',
    author: null
  },
  {
    text: 'Maybe you are filling in answers for a test that you don\'t know the questions of.',
    author: null
  },
  {
    text: 'Not everything a person eats becomes a part of them. Eat too much and it\'ll go right through you.',
    author: null
  },
  {
    text: 'Just because someone carried it well doesn\'t mean it isn\'t heavy.',
    author: null
  },
  {
    text: 'It\'s ok to be lost, the journey of being lost is the process of finding yourself.',
    author: null
  },
  {
    text: 'Be willing to walk at a turtle\'s pace even though everyone is walking at a hare\'s pace, because ultimately taking that time for yourself will help you in getting to where you want to be.',
    author: 'Sarah Pan'
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
        <svg className="quote-cup" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path className="quote-cup-steam quote-cup-steam-1" d="M9 7 C8.4 5.8 9.6 4.9 9 3.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path className="quote-cup-steam quote-cup-steam-2" d="M13 7 C12.4 5.8 13.6 4.9 13 3.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M5 10 h12 v5 a4.5 4.5 0 0 1 -4.5 4.5 h-3 A4.5 4.5 0 0 1 5 15 z" fill="currentColor" />
          <path d="M17 11.5 h1.5 a2.2 2.2 0 0 1 0 4.4 H17" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 21.5 h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span className="quote-label">today's pour</span>
        <span className="quote-divider" aria-hidden="true" />
      </div>
      <blockquote className="quote-text reveal">
        <p>&ldquo;{todaysQuote.text}&rdquo;</p>
        {todaysQuote.author && (
          <cite className="quote-author">— {todaysQuote.author}</cite>
        )}
      </blockquote>
    </section>
  )
}

export default Quote
