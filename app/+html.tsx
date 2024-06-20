import { ScrollViewStyleReset } from "expo-router/html";

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html itemscope="" itemtype="http://schema.org/WebPage" lang="en">
      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta
          content="https://kxci.us/logo.png"
          itemprop="image"
        />
        <title>Websearch via camera - kxci.us</title>

        <meta property="og:title" content="WebSearch Via Camera" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://search.kxci.us" />
        <meta
          property="og:image"
          content="https://kxci.us/logo.png"
        />
        <meta
          property="og:description"
          content="Find what you’re looking for with just a picture. Simply take a picture or upload one, and get accurate search results. It's searching, reinvented."
        />
        <meta property="og:site_name" content="WebSearch Via Camera" />
        <meta property="og:locale" content="en_US" />
        <meta property="fb:app_id" content="382707904455456" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width" />

        <meta
          name="description"
          content="Find what you’re looking for with just a picture."
        />

        {/* 
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native. 
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />

        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        {/* <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} /> */}
        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}
