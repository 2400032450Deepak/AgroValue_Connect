import React from 'react';
import { Helmet } from 'react-helmet-async';

const HelmetTags = ({ 
  title = 'AgroValue Connect - Empowering Farmers, Connecting Global Buyers',
  description = 'Transform agricultural products into value-added goods. Connect farmers with global buyers directly.',
  keywords = 'agriculture, farming, value-added products, organic, farmers market, global trade',
  image = '/images/og-image.jpg',
  url = 'https://agrovalueconnect.com',
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="AgroValue Connect" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="AgroValue Connect" />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "AgroValue Connect",
          "url": url,
          "logo": `${url}/logo.png`,
          "description": description,
          "sameAs": [
            "https://facebook.com/agrovalueconnect",
            "https://twitter.com/agrovalueconnect",
            "https://linkedin.com/company/agrovalueconnect"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default HelmetTags;