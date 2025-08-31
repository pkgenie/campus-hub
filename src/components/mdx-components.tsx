import React from 'react'

export const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="leading-7 my-4" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 my-4" {...props} />,
  code: (props: any) => <code className="rounded px-1 py-0.5 bg-gray-100" {...props} />,
  pre: (props: any) => <pre className="rounded-xl border overflow-x-auto my-4" {...props} />,
  a: ({ href, ...props }: any) => <a className="text-blue-600 underline" href={href} {...props} />,
}
