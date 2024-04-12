/* eslint-disable @next/next/no-img-element */

export default function UrlFavicon({ url, ...props }) {
  const domain = new URL(url).hostname

  return (
    <img
      alt={domain}
      {...props}
      src={`https://www.google.com/s2/favicons?domain=${domain}`}
    />
  )
}
