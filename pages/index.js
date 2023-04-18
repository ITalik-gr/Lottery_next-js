
import ManualHeader from '@/components/ManualHeader'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>  
          <title>Hello Title</title>
      </Head>
    <ManualHeader></ManualHeader>
    </div>
  )
}
