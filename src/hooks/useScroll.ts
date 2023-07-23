import { useEffect, useRef, useState } from 'react';

/*
 * ref 를 할당하면 해당 element 의 scroll position 을 반환한다.
 * 만약 ref 가 할당되지 않았다면 window 의 scroll position 을 반환한다.
 * */
const useScroll = () => {
  const [scrollValues, setScrollValues] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      let scrollY;
      let scrollX;

      if (ref.current) {
        scrollY = ref.current.scrollTop;
        scrollX = ref.current.scrollLeft;
      } else {
        scrollY = window.scrollY;
        scrollX = window.scrollX;
      }

      setScrollValues({ x: scrollX, y: scrollY });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, x: scrollValues.x, y: scrollValues.y };
};

export default useScroll;
