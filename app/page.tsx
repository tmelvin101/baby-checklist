import Checklist from '@/components/Checklist'

// Always render at request time — live data, no static prerender
export const dynamic = 'force-dynamic'

export default function Home() {
  return <Checklist />
}
