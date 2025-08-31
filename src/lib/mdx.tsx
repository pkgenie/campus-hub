import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { mdxComponents } from '@/components/mdx-components'

export async function Mdx({ code }: { code: string }) {
  return (
    <MDXRemote
      source={code}
      components={mdxComponents as any}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark', keepBackground: false }]],
        },
      }}
    />
  )
}
