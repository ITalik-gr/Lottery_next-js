
import { Inter } from 'next/font/google'
import Head from 'next/head'
// import ManualHeader from '@/components/ManualHeader'
import Header from '@/components/Header'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>  
          <title>Hello Title</title>
      </Head>
      
      <Header />
      {/* <ManualHeader /> */}
    </div>
  )
}
