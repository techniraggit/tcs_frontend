import React, { useState } from "react";
import Video from "twilio-video";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../apis/axiosConfig";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import "./meeting.css";

const Meeting = () => {
  const styles = {
    video: {
      display: "flex",
      flexWrap: "wrap",
    },
  };
  const params = useParams();
  const navigate = useNavigate();
  const [notepad, setNotepad] = useState("");
  const [globalRoom, setGlobalRoom] = useState();
  const [muted, setMuted] = useState(false);
  const [quitVideo, setQuitVideo] = useState(false);
  const muteAudio = () => {
    console.log(globalRoom.localParticipant.audioTracks);
    globalRoom.localParticipant.audioTracks.forEach(track => {
      track.track.disable();
    });
    setMuted(!muted);
  }
  const stopVideo = () => {
    globalRoom.localParticipant.videoTracks.forEach(track => {
      track.track.disable();
      setQuitVideo(!quitVideo);
    });
  }
  const playAudio = () => {
    globalRoom.localParticipant.audioTracks.forEach(track => {
      track.track.enable();
      setMuted(!muted);
    });
  }
  const startVideo = () => {
    globalRoom.localParticipant.videoTracks.forEach(track => {
      track.track.enable();
      setQuitVideo(!quitVideo);
    });
  }
  const sendData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem("token"));
    var raw = JSON.stringify({
      room_name: params.room_name,
      notepad: notepad ? notepad : '',
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    await fetch(axios.defaults.baseURL + "/doctor/consult", requestOptions)
      .then(response => response.text())
      .then((result) => {console.log(result);navigate('/appointments');})
      .catch(error => console.log('error', error));
    globalRoom.disconnect();
  };
  const startRoom = async (event) => {
    // prevent a page reload when a user submits the form
    event.preventDefault();
    // hide the join form
    document.getElementById("room-name-form").style.display = "flex";
    const response = await axios.get(
      axios.defaults.baseURL +
      "/doctor/create_video_room?room_name=" +
      params.room_name
    );

    const { token, room_name } = response.data;
    // join the video room with the token
    const room = await joinVideoRoom(room_name, token);
    setGlobalRoom(room);
    handleConnectedParticipant(room.localParticipant);
    room.participants.forEach(handleConnectedParticipant);
    room.on("participantConnected", handleConnectedParticipant);

    // handle cleanup when a participant disconnects
    room.on("participantDisconnected", handleDisconnectedParticipant);

   setTimeout(()=>{
      axios.get(axios.defaults.baseURL+"/doctor/validate_call_doctor?room_name="+params.room_name).then((value)=>{console.log(value)});
    },60000);
    window.addEventListener("pagehide", () => room.disconnect());
    window.addEventListener("beforeunload", () => room.disconnect());
  };

  const handleConnectedParticipant = (participant) => {
    // create a div for this participant's tracks
    const participantDiv = document.createElement("div");
    participantDiv.setAttribute("id", participant.identity);
    document.getElementById("video-container").appendChild(participantDiv);

    // iterate through the participant's published tracks and
    // call `handleTrackPublication` on them
    participant.tracks.forEach((trackPublication) => {
      handleTrackPublication(trackPublication, participant);
    });

    // listen for any new track publications
    participant.on("trackPublished", handleTrackPublication);
  };

  const handleTrackPublication = (trackPublication, participant) => {
    function displayTrack(track) {
      // append this track to the participant's div and render it on the page
      const participantDiv = document.getElementById(participant.identity);
      // track.attach creates an HTMLVideoElement or HTMLAudioElement
      // (depending on the type of track) and adds the video or audio stream
      participantDiv.append(track.attach());
    }

    // check if the trackPublication contains a `track` attribute. If it does,
    // we are subscribed to this track. If not, we are not subscribed.
    if (trackPublication.track) {
      displayTrack(trackPublication.track);
    }

    // listen for any new subscriptions to this track publication
    trackPublication.on("subscribed", displayTrack);
  };

  const handleDisconnectedParticipant = (participant) => {
    // stop listening for this participant
    participant.removeAllListeners();
    // remove this participant's div from the page
    const participantDiv = document.getElementById(participant.identity);
    participantDiv.remove();
  };

  const joinVideoRoom = async (roomName, token) => {
    // join the video room with the Access Token and the given room name
    const room = await Video.connect(token, {
      room: roomName,
    });
    return room;
  };

  return (
    <div style={{'textAlign':'center'}}>
      {!globalRoom?
      (<form id="room-name-form">
        <Button
          style={{"position":"absolute","top":"50%","transform":"scale(1.5)"}}
          type="submit"
          onClick={(e) => {
            startRoom(e);
            e.currentTarget.style.display = 'none';
          }}
          color="primary"
          variant="contained"
        >
          Join Room
        </Button>
        <span style={{"position":"absolute","top":"60%","left":"42%"}}>Click on above button to Connect with Patient</span>
      </form>):''}
      <div className="videoSection">
        <div id="video-container" className="video-outer" style={styles.video}></div>

        {localStorage.getItem('type') === "doctor" && globalRoom? (
          <div id="noteSection" >
            <ReactQuill
              style={{ width: "100%" }}
              theme="snow"
              value={notepad}
              onChange={setNotepad}
            />
          </div>
        ) : (
          ""
        )}

      </div>
          {globalRoom?
      (<div className="btn-group-wrap">
          <Button type="button" onClick={()=>{!muted?muteAudio():playAudio()}}>
            {!muted?<FontAwesomeIcon icon={faMicrophone} />:<FontAwesomeIcon icon={faMicrophoneSlash} />}
          </Button>

          <Button type="button" onClick={()=>{!quitVideo?stopVideo():startVideo()}}>
            {!quitVideo?<FontAwesomeIcon icon={faVideo} />:<FontAwesomeIcon icon={faVideoSlash} />}
          </Button>

          <Button
            type="submit"
            className="red"
            onClick={() => {
              sendData();
            }}
            color="error"
            variant="contained"
          >
            <FontAwesomeIcon icon={faPhoneSlash} />
          </Button>
      </div>):''}
    </div>
  );
};

export default Meeting;
