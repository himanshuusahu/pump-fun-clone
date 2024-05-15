"use client"
import { useState, useEffect } from 'react'
import { Check } from 'lucide-react';


export default function Main() {

  const [coins, setCoins] = useState<any>([])
  const [kingOfHill, setKingOfHill] = useState<any>()
  const [sort, setSort] = useState('last_trade_timestamp')
  const [order, setOrder] = useState('DESC')
  const [openSort, setOpenSort] = useState<any>(false)
  const [openOrder, setOpenOrder] = useState<any>(false)
  const [showAnimation,setShowAnimation]=useState<any>(false)
  const [nsfw,setnsfw]=useState(false)


interface sorts {
  [key: string]: string;
}
  let sorts:any={
    'last_trade_timestamp':'sort: bump order',
    'last_reply':'sort: last reply',
    'reply_count':'sort: reply count',
    'market_cap':'sort: market cap',
    'created_timestamp':'sort: creation time'
  }

  useEffect(() => {
    getCoinDetails()
    getKingOfTheHill()
  }, [])
  useEffect(() => {
    getCoinDetails()
    getKingOfTheHill()
  }, [nsfw])

  useEffect(()=>{
    getCoinDetails()
  },[sort,order])

  async function getKingOfTheHill() {
    // setLoadingNews(true)
    let url = 'https://client-api-2-74b1891ee9f9.herokuapp.com/coins/king-of-the-hill?includeNsfw='+nsfw
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        const parts = data.image_uri.split("/");
        const lastPart = parts[parts.length - 1];
        const targetUrl = "https://pump.mypinata.cloud/ipfs/";
        const finalUrl = targetUrl + lastPart;

        data['image_uri'] = finalUrl
        console.log(data)

        setKingOfHill(data)
        // setLoadingNews(false)
      });
  }

  async function getCoinDetails() {
    // setLoadingNews(true)
    let url = 'https://client-api-2-74b1891ee9f9.herokuapp.com/coins?offset=0&limit=50&sort='+sort+'&order='+order+'&includeNsfw='+nsfw
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          const parts = data[i].image_uri.split("/");
          const lastPart = parts[parts.length - 1];
          const targetUrl = "https://pump.mypinata.cloud/ipfs/";
          const finalUrl = targetUrl + lastPart;

          data[i]['image_uri'] = finalUrl
        }
        setCoins(data)
        // setLoadingNews(false)
      });
  }

  return (
    <div className="text-white" >

      {/* {nav bar} */}
      <nav className="flex flex-wrap justify-between w-full p-2 items-start h-fit">
        <div className="flex gap-2 items-center">
          <a href="/board">
            <img alt="Pump" loading="lazy" width="25" height="25" decoding="async" data-nimg="1" className="mr-4" src="https://pump.fun/_next/image?url=%2Flogo.png&w=32&q=75" />
          </a>
          <div className="grid h-fit">
            <div className="flex gap-2">
              <a className="text-sm text-white hover:underline hover:font-bold" href="https://twitter.com/pumpdotfun" target="_blank" rel="noopener noreferrer">[twitter]</a>
              <a className="text-sm text-white hover:underline hover:font-bold" href="https://t.me/pumpfunsupport" target="_blank" rel="noopener noreferrer">[support]</a>
            </div><div className="flex gap-2"><a className="text-sm text-white hover:underline hover:font-bold" href="https://t.me/launchonpump" target="_blank" rel="noopener noreferrer">[telegram]</a>
              <button className="text-sm text-slate-50 hover:font-bold hover:bg-transparent hover:text-slate-50" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r2:" data-state="closed">[how it works]</button>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <div className="p-2 rounded flex items-center gap-1 text-sm bg-green-300">
              <a href="/profile/4JQ8QvwwLD5m9H95X6afJhfneRb9YvgLaT4xg9HAAFyv">
                <div className="flex gap-1 items-center">
                  {/* <img src="/pepe.png" className="w-4 h-4 rounded" /> */}
                  <div className="px-1 rounded hover:underline flex gap-1">4JQ8Qv </div>
                </div>
              </a>
              bought 0.4650 SOL of
              <a className="hover:underline flex gap-2" href="/DLuYEu7HF2vunUbuj7xYgW6G2VtksjY3XujYJYnFMdxn">\
                Sunshine
                <img src="https://pump.mypinata.cloud/ipfs/QmeD4gVHoEN2rn8ih1Yx1rAfZVTn1mJFNV7La3HwEe69yu" className="h-5 w-5 rounded-full" />
              </a>
            </div>
            <div className="hidden lg:block">
              <div className="p-2 rounded flex items-center gap-1 text-sm bg-blue-300">
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-4 h-4">
                  <img className="aspect-square h-full w-full" alt="anon" src="https://www.pinclipart.com/picdir/big/184-1843111_pepe-the-frog-crying-png-clipart.png" />
                </span>
                <a href="/profile/5XQW5mv9pgPM4B1Y2sNcTg9pioA6DtGS2X5NoW9dDrVL">
                  <span className="hover:underline">5XQW5m </span>
                </a>
                <span>created </span>
                <a className="hover:underline flex gap-2" href="/2mSD3kGQ8WxU23MmEhrAMgVBWJ6yb9UPptXWcPsDqVWf">
                  $MeowWick
                  <img src="https://pump.mypinata.cloud/ipfs/QmY7Y8VnDTx7TbQ2XpHfWfYtqATdmLpfm7tYQyAmkMffWd" className="h-5 w-5 rounded-full" />
                </a>
                <span> on 04/13/24 </span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex md:gap-2 grid gap-1 my-auto">
          <div className="grid justify-items-end">
            <button className="text-sm text-slate-50 hover:font-bold hover:bg-transparent hover:text-slate-50" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r5:" data-state="closed">
              [connect wallet]
            </button>
          </div>
        </div>
      </nav>

      {/* {select chain} */}
      <div className="text-white flex gap-2 items-center text-sm justify-center">
        <div>selected chain:</div>
        <a href="https://blast.pump.fun" className="cursor-pointer border p-1 rounded hover:border-white hover:opacity-100 border-transparent opacity-50">
          <img src="https://pump.fun/blast.png" alt="blast" className="h-4" />
        </a>
        <a href="https://www.pump.fun" className="cursor-pointer border p-1 rounded hover:border-white hover:opacity-100 border-green-300 opacity-100">
          <img src="https://pump.fun/solana.png" alt="solana" className="h-4" />
        </a>
      </div>


      {/* {main start} */}
      <main>
        <div className="grid h-screen md:gap-12 gap-4">

          <div className="flex flex-col items-center w-full mt-8">
            <a className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 mb-4 text-2xl text-slate-50 hover:font-bold hover:bg-transparent hover:text-slate-50" href="/create">
              [start a new coin]
            </a>

            <div className="text-white max-w-[800px] grid gap-2">

              <img src="https://pump.fun/king-of-the-hill.png" alt="king of the hill" className="h-8 justify-self-center" />

              {/* {kill of the hill } */}
              <a href="/2GymcXrXxPVDXuvve3PP6qdj2smKjBbSGx7e5dNf9Aat">
                <div className="p-2 flex border border-transparent hover:border-white gap-2 w-full max-h-[300px] overflow-hidden">
                  <div className="min-w-20">
                    <img className="mr-4 w-20 h-auto" src={kingOfHill?.image_uri} alt={kingOfHill?.description} />
                  </div>
                  <div className="gap-1 grid h-fit">
                    <div className="text-xs text-blue-200 flex items-center gap-2">
                      <div>Created by</div>
                      <a href={`https://pump.fun/${kingOfHill?.mint}`}>
                        <div className="flex gap-1 items-center">
                          <img src="https://pump.mypinata.cloud/ipfs/QmUoRj7pKtzyLQWKPJMYtVinwEasbKdtYuQfFJJxQnyBWd" className="w-4 h-4 rounded" />
                          <div className="px-1 rounded hover:underline flex gap-1">
                            {kingOfHill?.creator.slice(0, 6)}
                          </div>
                        </div>
                      </a>
                    </div>
                    <p className="text-xs text-green-300 flex gap-1">
                      market cap: {(kingOfHill?.usd_market_cap / 1000).toFixed(2)}K
                      {kingOfHill?.king_of_the_hill_timestamp && (
                        <div className="flex text-green-500">
                          [badge:
                          <div>
                            <div>
                              <div className="cursor-pointer hover:opacity-7" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rf:" data-state="closed">
                                <img src="https://pump.fun/king.png" alt="king of the hill badge" className="h-4" />
                              </div>
                            </div>
                          </div>]
                        </div>
                      )}

                    </p>
                    <p className="text-xs flex items-center gap-2">
                      replies: {kingOfHill?.reply_count}
                    </p>
                    <p className="text-sm w-full font-bold">
                      {kingOfHill?.name} [ticker: {kingOfHill?.symbol}]
                    </p>
                  </div>
                </div>
              </a>

            </div>
          </div>

          <div className="w-full grid justify-items-center px-2 sm:p-0">
            <input
              className="flex h-10 rounded-md text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  p-2 border border-gray-300 w-full max-w-[470px] bg-green-300 text-black border-none focus:border-none active:border-none"
              placeholder="search for token"
              type="text"
            />
          </div>

          <div className="grid gap-6 md:gap-12 md:px-12 px-2">

            <div className="grid sm:flex gap-4 w-full items-center">
              <div className="flex gap-4">
                <div>
                  <button onClick={(e) => { setOpenSort(!openSort) }} type="button" role="combobox" aria-controls="radix-:r0:" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" className="flex h-10 w-full sm:w-fit items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1  bg-green-300 text-black border-none focus:border-none active:border-none" aria-label="Sort">
                    <span>
                      {sorts[sort]}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true">
                      <path d="m6 9 6 6 6-6">
                      </path>
                    </svg>
                  </button>
                  <div className={` text-black absolute p-2 bg-green-300 rounded-lg ${openSort === true ? '' : 'hidden'}`}>
                  
                    <div className={`flex ${sort === 'last_trade_timestamp' ? 'bg-white' : ''} hover:bg-white px-1 w-full text-md`}>
                      <h1 onClick={(e) => { setSort('last_trade_timestamp'); setOpenSort(!openSort); }} className=' cursor-default flex items-center px-2 py-1 rounded-md'>
                        <Check className={`w-5 mr-2 ${sort !== 'last_trade_timestamp' ? 'opacity-0' : 'opacity-1'}`} />
                        sort: bump order
                      </h1>
                    </div>

                    <div className={`flex ${sort === 'last_reply' ? 'bg-white' : ''} hover:bg-white px-1 w-full text-md`}>
                      <h1 onClick={(e) => { setSort('last_reply'); setOpenSort(!openSort); }} className=' cursor-default flex items-center px-2 py-1 rounded-md'>
                        <Check className={`w-5 mr-2 ${sort !== 'last_reply' ? 'opacity-0' : 'opacity-1'}`} />
                        sort: last reply
                      </h1>
                    </div>

                    <div className={`flex ${sort === 'reply_count' ? 'bg-white' : ''} hover:bg-white px-1 w-full text-md`}>
                      <h1 onClick={(e) => { setSort('reply_count'); setOpenSort(!openSort); }} className=' cursor-default flex items-center px-2 py-1 rounded-md'>
                        <Check className={`w-5 mr-2 ${sort !== 'reply_count' ? 'opacity-0' : 'opacity-1'}`} />
                        sort: reply count
                      </h1>
                    </div>

                    <div className={`flex ${sort === 'market_cap' ? 'bg-white' : ''} hover:bg-white px-1 w-full text-md`}>
                      <h1 onClick={(e) => { setSort('market_cap'); setOpenSort(!openSort); }} className=' cursor-default flex items-center px-2 py-1 rounded-md'>
                        <Check className={`w-5 mr-2 ${sort !== 'market_cap' ? 'opacity-0' : 'opacity-1'}`} />
                        sort: market cap
                      </h1>
                    </div>

                    <div className={`flex ${sort === 'created_timestamp' ? 'bg-white' : ''} hover:bg-white px-1 w-full text-md`}>
                      <h1 onClick={(e) => { setSort('created_timestamp'); setOpenSort(!openSort); }} className=' cursor-default flex items-center px-2 py-1 rounded-md'>
                        <Check className={`w-5 mr-2 ${sort !== 'created_timestamp' ? 'opacity-0' : 'opacity-1'}`} />
                        sort: creation time
                      </h1>
                    </div>

                  </div>
                </div>

                <div>
                  <button onClick={(e) => { setOpenOrder(!openOrder) }} type="button" role="combobox" aria-controls="radix-:r1:" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" className="flex h-10 w-full sm:w-fit items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1  bg-green-300 text-black border-none focus:border-none active:border-none" aria-label="Order">
                    <span>
                      order: desc
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true">
                      <path d="m6 9 6 6 6-6">
                      </path>
                    </svg>
                  </button>

                  <div className={`border-2 text-black absolute p-1 bg-green-300 rounded-lg ${openOrder === true ? '' : 'hidden'}`}>
                    <div className={`flex ${order === 'ASC' ? 'bg-white' : ''} hover:bg-white px-1 w-full text-md`}>
                      <h1 onClick={(e) => { setOrder('ASC'); setOpenOrder(!openOrder) }} className=' cursor-default flex items-center px-2 py-1 rounded-md'>
                        <Check className={`w-5 mr-2 ${sort !== 'ASC' ? 'opacity-0' : 'opacity-1'}`} />
                        order: asc
                      </h1>
                    </div>

                    <div className={`flex ${order === 'DESC' ? 'bg-white' : ''} hover:bg-white px-1 w-full text-md`}>
                      <h1 onClick={(e) => { setOrder('DESC'); setOpenOrder(!openOrder) }} className=' cursor-default flex items-center px-2 py-1 rounded-md'>
                        <Check className={`w-5 mr-2 ${sort !== 'DESC' ? 'opacity-0' : 'opacity-1'}`} />
                        order: desc
                      </h1>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex gap-1 h-fit items-center text-white">
                <div>Show animations:</div>
                <div onClick={(e)=>{setShowAnimation(true)}} className={`cursor-pointer px-1 rounded ${showAnimation===true ? 'bg-green-300 text-black':'hover:bg-gray-800 text-gray-500'}`}>On</div>
                <div onClick={(e)=>{setShowAnimation(false)}} className={`cursor-pointer px-1 rounded ${showAnimation===false ? 'bg-green-300 text-black':'hover:bg-gray-800 text-gray-500'}`}>Off</div>
              </div>
              <div className="flex gap-1 h-fit items-center text-white">
                <div>Include nsfw:</div>
                <div onClick={(e)=>{setnsfw(true)}} className={`cursor-pointer px-1 rounded ${nsfw===true ? 'bg-green-300 text-black':'hover:bg-gray-800 text-gray-500'} `}>On</div>
                <div onClick={(e)=>{setnsfw(false)}} className={`cursor-pointer px-1 rounded ${nsfw===false ? 'bg-green-300 text-black':'hover:bg-gray-800 text-gray-500'} `}>Off</div>
              </div>
            </div>

            {/* {loop of coins} */}
            {coins.length > 0 && (
              <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 text-gray-400 gap-4">
                {coins.map((item: any, index: any) => (
                  <a key={index} href={`https://pump.fun/${item?.mint}`}>
                    <div className="max-h-[300px] overflow-hidden h-fit p-2 flex border border-transparent hover:border-white gap-2 w-full ">
                      <div className="min-w-32">
                        <img className="mr-4 w-32 h-auto" src={item?.image_uri} alt={item?.description} />
                      </div>
                      <div className="gap-1 grid h-fit">
                        <div className="text-xs text-blue-200 flex items-center gap-2">
                          <div>Created by</div>
                          <a href="/profile/Percaholic">
                            <div className="flex gap-1 items-center">
                              <img src="https://pump.mypinata.cloud/ipfs/QmQytLpVZWhhmC42LDFQe7vM6tqHftHQEJFrC8GQBEfS7j" className="w-4 h-4 rounded" />
                              <div className="px-1 rounded hover:underline flex gap-1" >
                                {item?.creator.slice(0, 6)}
                              </div>
                            </div>
                          </a>
                        </div>
                        <p className="text-xs text-green-300 flex gap-1">
                          market cap: {(item?.usd_market_cap / 1000).toFixed(2)}K
                          {item?.king_of_the_hill_timestamp && (
                            <div className="flex text-green-500">
                              [badge:
                              <div>
                                <div>
                                  <div className="cursor-pointer hover:opacity-7" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rf:" data-state="closed">
                                    <img src="https://pump.fun/king.png" alt="king of the hill badge" className="h-4" />
                                  </div>
                                </div>
                              </div>]
                            </div>
                          )}
                        </p>
                        <p className="text-xs flex items-center gap-2">
                          replies: {item?.reply_count}
                        </p>
                        <p className="text-sm w-full">
                          <span className="font-bold">{item?.name} (ticker: {item?.symbol}): </span>{item.description}</p>
                      </div>
                    </div>
                  </a>

                ))
                }
              </div>
            )}

            <div className="w-full flex justify-center mt-4">
              <div className="justify-self-end mb-20">
                <div className="flex justify-center space-x-2 text-slate-50">
                  <button className="text-sm text-slate-400 cursor-not-allowed">
                    [ &lt;&lt; ]
                  </button>
                  <span>1</span>
                  <button className="text-sm text-slate-50 hover:font-bold hover:bg-transparent hover:text-slate-50">
                    [ &gt;&gt; ]
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main >

    </div >
  )

}