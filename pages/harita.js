import Tooltip from '@components/map/Tooltip';
import React from 'react';
import TurkeyMap from 'turkey-map-react';

function harita() {
  return (
    <div>
      <TurkeyMap
        customStyle={{ idleColor: '#272822', hoverColor: '#60a5fa' }}
        hoverable={true}
        onHover={({ plateNumber, cityName }) =>
          console.log('Cursor is over on ' + plateNumber + ' - ' + cityName + '!')
        }
      />
    </div>
  );
}

export default harita;
