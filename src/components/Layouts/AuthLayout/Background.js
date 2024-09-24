import * as React from 'react';
import squiggle from 'assets/squiggle.png';
import { colors } from '@leapeasy/ui-kit';
import rectangle from 'assets/rectangle.png';

export default function Background(props) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: colors.purple[700],
        zIndex: -1,
      }}
    >
      <img src={squiggle} style={{ maxHeight: '100%', position: 'relative', top: '-6%' }} />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          right: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <img src={rectangle} style={{ minWidth: '100%', minHeight: '100%' }} />
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#2E0F40',
            opacity: 0.04,
            backdropFilter: 'blur(4px)',
          }}
        />
      </div>
    </div>
  );
}
