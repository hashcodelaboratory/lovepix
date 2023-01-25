import React, { ReactNode, useEffect, useRef } from "react";
import styles from "../../home.module.scss";
import { animated, to, useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";

const calcX = (y: number, ly: number) => (y - ly - window.innerHeight / 2) / 50;
const calcY = (x: number, lx: number) => -(x - lx - window.innerWidth / 2) / 50;

type Props = {
  children: ReactNode;
};

const ParallaxView = ({ children }: Props) => {
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);

    return () => {
      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
    };
  }, []);

  const domTarget = useRef(null);
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 0.5, tension: 50, friction: 10 },
    })
  );

  useGesture(
    {
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.05,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { domTarget, eventOptions: { passive: false } }
  );

  return (
    <animated.div
      ref={domTarget}
      className={styles.card}
      style={{
        transform: "perspective(600px)",
        x,
        y,
        scale: to([scale, zoom], (s, z) => s + z),
        rotateX,
        rotateY,
        rotateZ,
        // border: '10px solid white'
      }}
    >
      {children}
    </animated.div>
  );
};

export default ParallaxView;
