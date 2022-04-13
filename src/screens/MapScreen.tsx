import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Image as RNImage,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { ToggleButton, useTheme } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanPinchView } from '../components/PanPinchView';
import { UserPin } from '../components/UserPin';
import { useAttitude } from '../hooks/useAttitude';
import { useHeading } from '../hooks/useHeading';
import { useSensorListener } from '../hooks/useSensorListener';
import { useStep } from '../hooks/useStep';
import { BadgeButton } from '../components/BadgeButton';
import { auth, db, storage } from '../../firebase';
import { ServerContext } from '../contexts/ServerProvider';
import { DialogContext } from '../contexts/DialogProvider';
import { AuthContext } from '../contexts/AuthProvider';
import { BottomSheetContext } from '../contexts/BottomSheetProvider';

type RNImageRefType = {
  uri: string;
  width: number;
  height: number;
};

type MembersType = {
  [uid: string]: {
    name: string;
    email: string;
    location: {
      x: number;
      y: number;
    };
  };
};

type LocationType = {
  x: number;
  y: number;
};

export const MapScreen = () => {
  const [trackedUser, setTrackedUser] = useState<string | null>();
  const [tracking, setTracking] = useState<LocationType | null>();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPos, setIsPos] = useState(false);
  const [isCurrentPos, setIsCurrentPos] = useState(false);
  const [toggle, setToggle] = useState<string | null>('layer1');
  const layers = useRef<Array<string>>([]);
  const members = useRef<MembersType>({});
  const RNImageRef = useRef<RNImageRefType>({ uri: '', width: 0, height: 0 });
  const { data } = useContext(ServerContext);
  const { displayError } = useContext(DialogContext);
  const { currentUser, update } = useContext(AuthContext);
  const { presentModalHandler, closeModalHandler, useAnimatedModalHandler } =
    useContext(BottomSheetContext);

  const theme = useTheme();
  const [attitude, setAttitudeSensors] = useAttitude();
  const [ref, heading, setHeadingSensors] = useHeading(attitude);
  const [step, setStepSensor] = useStep(attitude);
  const window = useWindowDimensions();

  const badgeBottom = useSharedValue(window.height * 0.04);

  useAnimatedModalHandler({
    onAnimated: (from, to) => {
      if (to === 0) {
        badgeBottom.value = withTiming(window.height * 0.25);
      } else if (to === -1) {
        badgeBottom.value = withTiming(window.height * 0.04);
      }
    },
  });

  const badgeBottomStyle = useAnimatedStyle(() => ({
    bottom: badgeBottom.value,
  }));

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && data) {
        storage
          .ref()
          .child(`maps/${data.id}/${toggle}.png`)
          .getDownloadURL()
          .then((url) => {
            RNImage.getSize(url, (width, height) => {
              RNImageRef.current = { uri: url, width, height };
            });
          })
          .catch((res) => displayError({ msg: res.message }));
      }
    });
  }, [toggle]);

  useEffect(() => {
    if (data && currentUser.auth) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setToggle('layer1');
          storage
            .ref()
            .child(`maps/${data.id}/layer1.png`)
            .getDownloadURL()
            .then((url) => {
              RNImage.getSize(url, (width, height) => {
                RNImageRef.current = { uri: url, width, height };
              });
            })
            .catch((res) => displayError({ msg: res.message }));
          storage
            .ref()
            .child(`maps/${data.id}`)
            .listAll()
            .then((res) => {
              layers.current = [];
              res.items.forEach((itemRef) => {
                layers.current.push(itemRef.name.replace('.png', ''));
              });
            })
            .catch((res) => displayError({ msg: res.message }));
        }
      });
      db.ref(`workspace/${data.id}`)
        .child('members')
        .on('value', (snapshot) => {
          Object.keys(snapshot.val()).forEach((uid) => {
            if (uid !== 'undefined' && currentUser.auth?.uid !== uid) {
              db.ref(`users/${uid}`).on('value', (userData) => {
                const { name, email, coordinate } = userData.val();
                members.current[uid] = {
                  name,
                  email,
                  location: coordinate,
                };
              });
            }
          });
        });
    }
  }, [data, currentUser]);

  useSensorListener(
    'fusion',
    ([acc, mag, gyr]) => {
      setAttitudeSensors({ acc, mag });
      setStepSensor({ acc });
      setHeadingSensors({ acc, mag, gyr }, 100);
    },
    100
  );

  const { length } = step;
  useEffect(() => {
    setPosition((pos) => {
      const sx = length * Math.cos(heading.origin) * 10;
      const sy = length * Math.sin(heading.origin) * 10;
      return { x: pos.x + sx, y: pos.y + sy };
    });
  }, [step]);

  useEffect(() => {
    update('location', position).catch((res) =>
      displayError({ msg: res.message })
    );
  }, [position]);

  const styles = StyleSheet.create({
    wrapper: {
      width: RNImageRef.current.width / 3,
      height: RNImageRef.current.height / 3,
      position: 'relative',
    },
    center: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 1,
    },
  });

  const trackedPos = ({ x, y }: LocationType) => {
    const sx = -(x + 6 - RNImageRef.current.width / 6);
    const sy = -(y + 6 - RNImageRef.current.height / 6);
    return { x: sx, y: sy };
  };

  return (
    <>
      <PanPinchView
        tracking={tracking}
        onPanStart={() => {
          setTracking(null);
          setTrackedUser(null);
          setIsCurrentPos(false);
          closeModalHandler();
        }}
      >
        <View style={[styles.wrapper, styles.center]}>
          {RNImageRef.current.uri !== '' ? (
            <View
              onTouchStart={(e) => {
                const { locationX, locationY } = e.nativeEvent;
                if (isPos) {
                  setPosition({ x: locationX, y: locationY });
                  setIsCurrentPos(true);
                  setIsPos(false);
                }
              }}
            >
              <RNImage
                style={{ width: '100%', height: '100%' }}
                source={{ uri: RNImageRef.current.uri }}
              />
            </View>
          ) : null}
          <UserPin
            color={theme.colors.primary}
            position={position}
            heading={heading.origin}
            onMove={() => {
              if (trackedUser === currentUser.auth?.uid) {
                setTracking(trackedPos(position));
              }
            }}
          />
          {Object.entries(members.current).map(([key, val]) => (
            <UserPin
              key={key}
              color={theme.colors.accent}
              position={val.location}
              onPress={() => {
                presentModalHandler({
                  snapPoints: ['30%'],
                  content: () => (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text>name:{val.name}</Text>
                      <Text>email:{val.email}</Text>
                      <Text>
                        x:{val.location.x}, y:{val.location.y}
                      </Text>
                    </View>
                  ),
                });
                setTracking(trackedPos(val.location));
                setTrackedUser(key);
                setIsCurrentPos(false);
              }}
              onMove={() => {
                if (trackedUser === key) {
                  setTracking(trackedPos(val.location));
                }
              }}
            />
          ))}
        </View>
      </PanPinchView>
      <View
        style={[
          {
            position: 'absolute',
            left: window.width * 0.85,
            top: 30,
            backgroundColor: '#fff',
            borderRadius: 3,
          },
          styles.shadow,
        ]}
      >
        <ToggleButton.Group value={toggle} onValueChange={() => {}}>
          {layers.current.map((layer, idx) => (
            <ToggleButton
              color={toggle === layer ? theme.colors.primary : '#999'}
              icon={`numeric-${idx + 1}`}
              value={layer}
              onPress={() => setToggle(layer)}
            />
          ))}
        </ToggleButton.Group>
      </View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: window.width * 0.82,
            bottom: window.height * 0.04,
          },
          badgeBottomStyle,
        ]}
      >
        <BadgeButton
          icon="near-me"
          color={isCurrentPos ? theme.colors.primary : '#ccc'}
          onPress={() => {
            setTracking(trackedPos(position));
            setTrackedUser(currentUser.auth?.uid);
            setIsCurrentPos(true);
            closeModalHandler();
          }}
        />
        <BadgeButton
          style={{ marginTop: 15 }}
          icon={isPos ? 'gps-fixed' : 'gps-not-fixed'}
          dark
          color={theme.colors.primary}
          onPress={() => {
            setIsPos(true);
            setTrackedUser(currentUser.auth?.uid);
            closeModalHandler();
          }}
        />
      </Animated.View>
    </>
  );
};
