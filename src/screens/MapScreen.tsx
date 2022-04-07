import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image as RNImage, StyleSheet, View } from 'react-native';
import { ToggleButton, useTheme } from 'react-native-paper';
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

type RNImageRefType = {
  uri: string;
  width: number;
  height: number;
};

type MembersType = Array<{
  uid: string;
  name: string;
  email: string;
  location: {
    x: number;
    y: number;
  };
}>;

export const MapScreen = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPos, setIsPos] = useState(false);
  const [isCurrentPos, setIsCurrentPos] = useState(false);
  const [toggle, setToggle] = useState<string | null>('layer1');
  const layers = useRef<Array<string>>([]);
  const members = useRef<MembersType>([]);
  const RNImageRef = useRef<RNImageRefType>({ uri: '', width: 0, height: 0 });
  const { data } = useContext(ServerContext);
  const { displayError } = useContext(DialogContext);
  const { currentUser } = useContext(AuthContext);

  const theme = useTheme();
  const [attitude, setAttitudeSensors] = useAttitude();
  const [ref, heading, setHeadingSensors] = useHeading(attitude);
  const [step, setStepSensor] = useStep(attitude);

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
          members.current = [];
          Object.keys(snapshot.val()).forEach((uid) => {
            if (uid !== 'undefined' && currentUser.auth?.uid !== uid) {
              db.ref(`users/${uid}`)
                .child('coordinate')
                .on('value', (coordinate) => {
                  const { x, y } = coordinate.val();
                  const location = { x, y };
                  members.current.push({ uid, name: '', email: '', location });
                });
            }
          });
        });
    }
  }, [data, currentUser]);

  const panX = -(position.x - RNImageRef.current.width / 6);
  const panY = -(position.y - RNImageRef.current.height / 6);

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

  return (
    <>
      <PanPinchView
        onTracking={isCurrentPos ? () => ({ panX, panY }) : undefined}
        onPanStart={() => {
          setIsCurrentPos(false);
        }}
      >
        <View style={[styles.wrapper, styles.center]}>
          {RNImageRef.current.uri !== '' ? (
            <View
              onTouchStart={(e) => {
                const { locationX, locationY } = e.nativeEvent;
                if (isPos) {
                  setPosition({ x: locationX, y: locationY });
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
          />
          {members.current.map((member) => (
            <UserPin
              key={member.uid}
              color={theme.colors.accent}
              position={member.location}
            />
          ))}
        </View>
      </PanPinchView>
      <View
        style={[
          {
            position: 'absolute',
            left: 330,
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
              key={layer}
              color={toggle === layer ? theme.colors.primary : '#999'}
              icon={`numeric-${idx + 1}`}
              value={layer}
              onPress={() => setToggle(layer)}
            />
          ))}
        </ToggleButton.Group>
      </View>
      <View style={{ position: 'absolute', left: 320, top: 500 }}>
        <BadgeButton
          icon="near-me"
          color={isCurrentPos ? theme.colors.primary : '#ccc'}
          onPress={() => {
            setIsCurrentPos(true);
          }}
        />
        <BadgeButton
          style={{ marginTop: 15 }}
          icon={isPos ? 'gps-fixed' : 'gps-not-fixed'}
          dark
          color={theme.colors.primary}
          onPress={() => {
            setIsPos(true);
          }}
        />
      </View>
    </>
  );
};
