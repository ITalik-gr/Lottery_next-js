
import { Inter } from 'next/font/google'
import Head from 'next/head'
// import ManualHeader from '@/components/ManualHeader'
import Header from '@/components/Header'
import LotteryEntrance from '@/components/LotteryEntrance'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>  
          <title>Hello Title</title>
      </Head>
      
      <Header />
      <LotteryEntrance />
      {/* <ManualHeader /> */}
    </div>
  )
}
