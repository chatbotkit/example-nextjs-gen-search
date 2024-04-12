'use client'

import Link from 'next/link'

import UrlFavicon from '@/components/UrlFavicon'

export default function SearchResults({ data }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        {data.web?.results.slice(0, 3).map(({ title, url, description }) => (
          <div key={url} className="flex flex-col gap-2">
            <Link
              className="text-indigo-600 hover:underline space-x-2"
              href={url}
              target="_blank"
            >
              <UrlFavicon
                url={url}
                className="inline w-[1em] h-[1em] rounded-full"
              />
              <span>{title}</span>
            </Link>
            <div
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2">
        {data.videos?.results.map(({ title, url, thumbnail }) => (
          <div key={url} className="flex flex-col gap-2">
            <Link
              className="text-indigo-600 hover:underline space-x-2"
              href={url}
              target="_blank"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={title}
                className="w-full h-36 object-cover rounded-lg"
                src={thumbnail.src}
              />
              <span>{title}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
