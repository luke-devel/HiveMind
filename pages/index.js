import Link from 'next/link';

export default function Index() {
  return <>
    <h1>Hello World!</h1>
    <Link href="/about">About.js</Link>
    <a href="/about">About.js</a>
  </>
}