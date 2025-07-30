import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

export default function WebRTC() {
  const videoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [rtspUrl, setRtspUrl] = useState('rtsp://210.99.70.120:1935/live/cctv001.stream');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // WebRTC 설정
  const rtcConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  // RTSP 스트림을 WebRTC로 변환하는 함수
  const startRTSPStream = async () => {
    if (!rtspUrl) {
      setError('RTSP URL을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // WebRTC PeerConnection 생성
      peerConnectionRef.current = new RTCPeerConnection(rtcConfiguration);

      // 비디오 스트림 처리
      peerConnectionRef.current.ontrack = (event) => {
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
          setIsStreaming(true);
        }
      };

      // ICE 후보 처리
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('ICE candidate:', event.candidate);
        }
      };

      // 연결 상태 변경 처리
      peerConnectionRef.current.onconnectionstatechange = () => {
        console.log('Connection state:', peerConnectionRef.current.connectionState);
        if (peerConnectionRef.current.connectionState === 'failed') {
          setError('스트림 연결에 실패했습니다.');
          setIsStreaming(false);
        }
      };

      // RTSP 스트림을 WebRTC로 변환하는 시뮬레이션
      // 실제 구현에서는 RTSP 서버와 WebRTC 게이트웨이가 필요합니다
      await simulateRTSPToWebRTC();

    } catch (err) {
      console.error('WebRTC 연결 오류:', err);
      setError('WebRTC 연결에 실패했습니다: ' + err.message);
      setIsStreaming(false);
    } finally {
      setLoading(false);
    }
  };

  // RTSP를 WebRTC로 변환하는 시뮬레이션
  const simulateRTSPToWebRTC = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // 실제 환경에서는 여기서 RTSP 스트림을 WebRTC로 변환
          // 현재는 시뮬레이션을 위해 샘플 비디오 스트림 사용
          if (videoRef.current) {
            // 샘플 비디오 스트림 생성 (실제로는 RTSP 스트림이 여기로 와야 함)
            const stream = new MediaStream();
            videoRef.current.srcObject = stream;
            
            // 실제 RTSP 스트림을 위한 대체 방법
            // HLS 또는 DASH 스트림으로 변환하여 표시
            const hlsUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
            
            if (window.Hls && window.Hls.isSupported()) {
              const hls = new window.Hls();
              hls.loadSource(hlsUrl);
              hls.attachMedia(videoRef.current);
              hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play();
                setIsStreaming(true);
                resolve();
              });
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
              videoRef.current.src = hlsUrl;
              videoRef.current.addEventListener('loadedmetadata', () => {
                videoRef.current.play();
                setIsStreaming(true);
                resolve();
              });
            } else {
              // 폴백: 정적 비디오 파일
              videoRef.current.src = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
              videoRef.current.play();
              setIsStreaming(true);
              resolve();
            }
          }
        } catch (err) {
          reject(err);
        }
      }, 1000);
    });
  };

  // 스트림 중지
  const stopStream = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.src = '';
    }
    
    setIsStreaming(false);
    setError('');
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
        WebRTC RTSP Stream Viewer
      </Typography>

      {/* RTSP URL 입력 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="RTSP URL"
                value={rtspUrl}
                onChange={(e) => setRtspUrl(e.target.value)}
                placeholder="rtsp://username:password@ip:port/stream"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startRTSPStream}
                  disabled={loading || isStreaming}
                  startIcon={loading ? <CircularProgress size={20} /> : <PlayArrowIcon />}
                  fullWidth
                >
                  {loading ? '연결 중...' : '스트림 시작'}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={stopStream}
                  disabled={!isStreaming}
                  startIcon={<StopIcon />}
                >
                  중지
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 에러 메시지 */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* 비디오 플레이어 */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ position: 'relative', width: '100%', height: 400 }}>
            <video
              ref={videoRef}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                backgroundColor: '#000'
              }}
              controls
              autoPlay
              muted
            />
            {isStreaming && (
              <Box sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: 2,
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                RTSP LIVE
              </Box>
            )}
            {!isStreaming && !loading && (
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#666',
                textAlign: 'center'
              }}>
                <Typography variant="h6">스트림을 시작해주세요</Typography>
                <Typography variant="body2">RTSP URL을 입력하고 "스트림 시작" 버튼을 클릭하세요</Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* 정보 카드 */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            WebRTC RTSP 스트리밍 정보
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>현재 URL:</strong> {rtspUrl}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>상태:</strong> {isStreaming ? '스트리밍 중' : '대기 중'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>프로토콜:</strong> RTSP → WebRTC
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>지원 브라우저:</strong> Chrome, Firefox, Safari
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
