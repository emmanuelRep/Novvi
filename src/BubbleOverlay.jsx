import React, { useEffect, useRef } from 'react';
import { GoogleMap, OverlayViewF } from '@react-google-maps/api';
import Bubble from './Bubble';

const BubbleOverlay = ({ price, map, position }) => {
  const getPixelPositionOffset = (width, height) => ({
    x: -(width /2),
    y: -(height /2),
  })

  return(
    <OverlayViewF
      position={position}
      mapPaneName={OverlayViewF.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <Bubble price={price}/>
    </OverlayViewF>
  )

  /*const overlayRef = useRef(null);

  useEffect(() => {
    class CustomOverlay extends google.maps.OverlayView {
      constructor() {
        super();
        this.position = position;
        this.price = price;
        this.div = null;
      }

      onAdd() {
        const div = document.createElement('div');
        div.className = 'custom-overlay';
        div.textContent = this.price;
        this.div = div;

        const panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
      }

      draw() {
        const point = this.getProjection().fromLatLngToDivPixel(this.position);
        if (point) {
          this.div.style.left = point.x + 'px';
          this.div.style.top = point.y + 'px';
        }
      }

      onRemove() {
        if (this.div) {
          this.div.parentNode.removeChild(this.div);
          this.div = null;
        }
      }
    }

    const customOverlay = new CustomOverlay();

    customOverlay.setMap(map);

    return () => {
      customOverlay.setMap(null); // Clean up when the component unmounts
    };
  }, [map, position, price]);

  return null; // BubbleOverlay doesn't render anything directly*/

};




export default BubbleOverlay
