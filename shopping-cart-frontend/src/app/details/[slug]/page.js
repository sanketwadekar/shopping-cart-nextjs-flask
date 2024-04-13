import '../../../index.css'
import { ClientOnly } from './client'

export async function generateStaticParams() {
	let posts = [];
	for (let i = 0; i < 100; i++) {
		posts.push(i);
	}
  let slugs = posts.map((post) => ({
    slug: post.toString(),
  }))
	return slugs;
}

export default function Page({params}) {
	const {slug} = params;
  return <ClientOnly id={slug}/>;
}
