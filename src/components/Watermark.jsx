import React from 'react';
import useUser from '../hooks/useUser';

export default function Watermark() {
  const user = useUser();

  let watermark = '蜻蜓FM';
  if (user) {
    watermark = `${watermark} ${user.get('nickname') || ''}`;

    const phone = user.get('phone');

    if (phone && phone.length >= 4) {
      watermark = `${watermark}${phone.substr(phone.length - 4, 4)}`;
    }
  }
  const backgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='150px' width='300px'><text x='50%' y='50%' fill='rgba(0, 0, 0, 0.1)' font-size='16'>${watermark}</text></svg>")`;

  return (
    <div className="watermark-wrapper">
      <div className="watermark" style={{ backgroundImage }} />
    </div>
  );
}
