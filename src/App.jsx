import { useState } from 'react'
import './App.css'
import { BiLinkExternal } from 'react-icons/bi'
import { FiGithub } from 'react-icons/fi'

const classNames = (...classes) => classes.filter(Boolean).join(' ');

function A({href, children, external}) {
  return (
    <a target={external ? '_blank' : ''} href={href} className='border-b text-orange-300 bg-orange-400/10 hover:bg-orange-400/20 border-orange-500/50 shadow-md shadow-transparent hover:shadow-orange-400/10 rounded-t-sm'>
      {children}{external ? <BiLinkExternal className='inline w-4 h-4 ml-0.5'/> : null}
    </a>
  )
}

function shuffle(arr) {
  for (let i = arr.length-1; i > 0; i--) {
    const j = Math.random()*(i+1)|0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const SYMBOLS = [
  'a1', 'a2', 'a3', 'a4',
  'b1', 'b2', 'b3', 'b4',
  'c1', 'c2', 'c3', 'c4',
  'd1',
]

function Label4({num}) {
  return (
    <span className='font-mono'
      onMouseEnter={() => setSelectedDeck4(num)}
      onMouseLeave={() => setSelectedDeck4(-1)}
    >
      {num}
    </span>
  )
}

function Label13({num}) {
  return (
    <span className='font-mono tracking-tight'
      onMouseEnter={() => setSelectedDeck13(num)}
      onMouseLeave={() => setSelectedDeck13(-1)}
    >
      {SYMBOLS[num]}
    </span>
  )
}

function App() {
  const [deal4, setDeal4] = useState([]);
  const [selectedDeck4, setSelectedDeck4] = useState(-1);
  const [deal13, setDeal13] = useState([]);
  const [selectedDeck13, setSelectedDeck13] = useState(-1);
  window.setSelectedDeck4 = setSelectedDeck4;
  window.setSelectedDeck13 = setSelectedDeck13;

  useState(() => {
    let arr4 = [];
    for (let s = 1; s <= 4; s++) {
      for (let i = 0; i < 13; i++) {
        arr4.push(s);
      }
    }
    shuffle(arr4);
    setDeal4(arr4);

    let arr13 = [];
    for (let s = 1; s <= 4; s++) {
      let pile = [];
      for (let i = 0; i < 13; i++) {
        pile.push(i);
      }
      shuffle(pile);
      arr13.push(...pile);
    }
    setDeal13(arr13);
  }, [])

  return (
    <div className='w-full min-h-full px-0 sm:px-8 py-1 sm:py-8 flex flex-col justify-center items-center bg-gradient-to-br from-fuchsia-500 via-violet-400 to-blue-400 selection:bg-violet-300/25 selection:text-zinc-50 select-none'>
      <div className='bg-zinc-950/60 text-zinc-200 w-full px-8 py-12 max-w-2xl sm:rounded-xl space-y-12'>
        <div className='space-y-6'>
          <div className='w-full flex justify-between items-center'>
            <div>
              <h1 className='text-2xl font-semibold tracking-tighter'>The Perfect Shuffle</h1>
              <span>Joseph Jackson</span>
            </div>
            <a href='https://github.com/jwseph/perfect-shuffle' className='p-2 rounded-full text-orange-300 bg-orange-400/10 hover:bg-orange-400/20 shadow-md shadow-transparent hover:shadow-orange-400/10 border-b border-orange-500/50'>
              <FiGithub className='w-6 h-6'/>
            </a>
          </div>
          <p>
            Ever wondered what method of shuffling a deck of cards guarantees the most randomness?
            According to <A href='https://youtu.be/AxJubaijQbI' external>a Numberphile video</A>, you should riffle shuffle seven times to make a deck almost completely random. But this doesn't achieve perfect randomness.
          </p>
          <p>
            This article will guide you through shuffling a deck with perfect randomness using the <A href='https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle' external>Fisher–Yates shuffle</A>, which is mathematically guaranteed to be random.
          </p>
        </div>
        <ol className='list-decimal list-inside marker:text-violet-400 space-y-12'>
          <li className='space-y-4'>
            <span>Deal a 52-card deck into four piles using these instructions:</span>
            <div className='space-y-4'>
              <div className='font-mono hover:text-zinc-50/25'>
                {deal4.map((num, i) => (
                  <>
                    {i%6 == 0 && <> </>}
                    <span className='hover:text-zinc-50 px-px'>
                      <Label4 num={num}/>
                    </span>
                  </>
                ))}
              </div>
              <div className='flex flex-wrap gap-2 justify-center'>
                {[1, 2, 3, 4].map((deck) => (
                  <div className={classNames(
                    'w-16 aspect-[5/7] border-2 flex justify-center items-center rounded-md font-mono text-xl',
                    selectedDeck4 == deck ? 'text-zinc-50 border-zinc-50' : 'text-zinc-50/25 border-zinc-50/25',
                  )}>
                    {deck}
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            Stack pile <Label4 num={1}/> onto pile <Label4 num={2}/>.
            Stack pile <Label4 num={2}/> onto pile <Label4 num={3}/>.
            Stack pile <Label4 num={3}/> onto pile <Label4 num={4}/>.
          </li>
          <li className='space-y-4'>
            <span>Deal the deck into 13 piles using these instructions:</span>
            <div className='space-y-4'>
              <div className='font-mono hover:text-zinc-50/25'>
                {deal13.map((num, i) => (
                  <>
                    {i%4 == 0 && <> </>}
                    <span className='hover:text-zinc-50 px-0.5'>
                      <Label13 num={num}/>
                    </span>
                  </>
                ))}
              </div>
              <div className='flex justify-center'>
                <div className='space-y-4'>
                  {[0, 4, 8, 12].map(startingDeck => (
                    <div className='flex flex-wrap gap-2'>
                      {[startingDeck, startingDeck+1, startingDeck+2, startingDeck+3].map((deck) => {
                        if (deck >= 13) return;
                        return <div className={classNames(
                          'w-16 aspect-[5/7] border-2 flex justify-center items-center rounded-md font-mono text-xl tracking-tight',
                          selectedDeck13 == deck ? 'text-zinc-50 border-zinc-50' : 'text-zinc-50/25 border-zinc-50/25',
                        )}>
                          {SYMBOLS[deck]}
                        </div>
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>
          <li>
            Stack pile <Label13 num={0}/> onto <Label13 num={1}/>,
            {' '}<Label13 num={1}/> onto <Label13 num={2}/>,
            {' '}<Label13 num={2}/> onto <Label13 num={3}/>,
            {' '}<Label13 num={3}/> onto <Label13 num={4}/>,
            {' '}<Label13 num={4}/> onto <Label13 num={5}/>,
            and so on, continuing this pattern until you stack
            {' '}<Label13 num={11}/> onto <Label13 num={12}/>.
          </li>
        </ol>
        <div>Now your deck is fully shuffled!</div>
        <div className='space-y-6'>
          <h2 className='text-lg font-medium tracking-tight'>Proof</h2>
          <p>
            The first step randomly splits the deck (using Fisher–Yates) into 4 piles of 13 cards.
            At this point, the pile each card is in is random, but the order of the 13 cards of each pile is not.
          </p>
          <p>
            The third step randomizes the order of the 13 cards of each pile (split the instructions into groups of 13 to see).
          </p>
          <p>
            To stack the 4 shuffled piles together into one shuffled deck, you'd have to recreate the piles by taking the cards layer by layer.
            However, the fourth step skips this by taking 4 cards at a time, which is the same as interweaving the 4 shuffled piles together.
            Since the piles are interweaved uniformly, this interweaving action is a bijection, and because a stack of the 4 shuffled piles would produce a shuffled deck, the interweaved deck must also be shuffled. □
          </p>
        </div>
        <div className='space-y-6'>
          <h2 className='text-lg font-medium tracking-tight'>Alternative proof</h2>
          <p>
            The first step has 52!/(13!)<sup>4</sup> possibilities, each with an equal weight. The second step has (13!)<sup>4</sup> possibilities, each with an equal weight. Taking the product, there are 52! pairs of one possibility from the first step and one from the second step.
            If each of these pairs creates a distinct deck, this shuffling method has 52! possible decks, each with an equal weight.
          </p>
          <p>
            To show that each of these pairs creates a distinct deck, after the first step, these piles never (nonuniformly) overlap with each other, so none of the third step's permutations can undo the first step's results.
          </p>
          <p>
            Since this shuffling method can generate exactly 52! decks, each with an equal weight, the decks it generates are perfectly shuffled. □
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
