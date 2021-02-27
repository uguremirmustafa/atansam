import { FaRProject } from 'react-icons/fa';
import { useEffect } from 'react';
export const Adsense = ({
  client,
  slot,
  style,
  format = 'auto',
  layout = '',
  layoutKey = '',
  responsive = false,
  className = '',
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') (window.adsbygoogle = window.adsbygoogle || []).push({});
  });

  return (
    <ins
      className={`${className} adsbygoogle`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    ></ins>
  );
};
