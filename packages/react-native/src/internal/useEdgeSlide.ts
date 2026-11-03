import * as React from 'react';
import { Animated } from 'react-native';
import { tokens } from '@adrian-danciu/ink-ui-tokens';

export function useEdgeSlide(open: boolean, offset: number, motion = true) {
  const [visible, setVisible] = React.useState(false);
  const visibleRef = React.useRef(false);
  const progress = React.useRef(new Animated.Value(0)).current;
  const openRef = React.useRef(open);
  openRef.current = open;

  React.useEffect(() => {
    progress.stopAnimation();
    if (!motion) {
      progress.setValue(open ? 1 : 0);
      visibleRef.current = open;
      setVisible(open);
      return;
    }
    if (open) {
      if (visibleRef.current) {
        Animated.timing(progress, { toValue: 1, duration: tokens.motionDuration.fast, useNativeDriver: true }).start();
      } else {
        visibleRef.current = true;
        setVisible(true);
      }
    } else if (visibleRef.current) {
      Animated.timing(progress, { toValue: 0, duration: tokens.motionDuration.fast, useNativeDriver: true }).start(({ finished }) => {
        if (finished && !openRef.current) {
          visibleRef.current = false;
          setVisible(false);
        }
      });
    }
    return () => progress.stopAnimation();
  }, [open, motion, progress]);

  function onShow() {
    if (openRef.current && motion) {
      Animated.timing(progress, { toValue: 1, duration: tokens.motionDuration.fast, useNativeDriver: true }).start();
    }
  }

  return { visible, onShow, translate: progress.interpolate({ inputRange: [0, 1], outputRange: [offset, 0] }) };
}
