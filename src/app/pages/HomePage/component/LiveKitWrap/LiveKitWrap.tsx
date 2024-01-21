import {
  ControlBar,
  DisconnectButton,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import React from 'react';

type Props = {
  token: string;
  onDisconnect: () => void;
};

const LiveKitWrap = ({ token, onDisconnect }: Props) => {
  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.REACT_APP_LIVEKIT_SERVER_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: '70vh', width: '90vw' }}
      onDisconnected={onDisconnect}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen 
      share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
  );
};

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: '90%' }}>
      {/* The GridLayout accepts zero or one child. The child is used
        as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}

export default LiveKitWrap;
